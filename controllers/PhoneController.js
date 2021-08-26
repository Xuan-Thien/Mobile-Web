const Phone = require('../models/Phone');

// phone_index, phone_detail, phone_create_get, phone_create_post, phone_delete

const phone_index = (req, res, next) => {
    Phone.find().limit(5)
        .then((response) => {
            res.render('phones/index',{title:'Home', phones: response});
        })
        .catch(error => {
            res.json({
                message: 'An error Occured!' + error
            })
        })
}

const phone_all = (req, res, next) => {
    Phone.find()
        .then((response) => {
            res.render('phones/products',{title:'All products', phones: response});
        })
        .catch(error => {
            res.json({
                message: 'An error Occured!' + error
            })
        })
}

const phone_detail = (req, res) => {
    const id = req.params.id;
    console.log(id);
    Phone.findById(id)
        .then((result) => {
            res.render('phones/product', {  title: 'Phone Details',phone: result });
        })
        .catch((err) => {
            res.render('404',{title:'Phone not found'});
        })
}

const phone_create_get = (req, res) => {
    res.render('phones/add-product', { title: 'Create a new phone' });
}

const phone_create_post = (req, res) => {
    console.log(req.body);
    let phone = new Phone({
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
        price: req.body.price,
        units: req.body.units
    })

    
    if(req.file){
        phone.image = '\\' + req.file.path;
    }


    phone.save()
    .then(response => {
        res.redirect('/stored-phones');
    })
    .catch(error => {
        res.json({
            message: 'An error Occured!'
        })
    })
}


const stored_phones = (req, res,next) => {
    Phone.find()
        .then((response) => {
            res.render('phones/stored-phones',{title:'Stored Phones', phones: response});
        })
        .catch(error => {
            res.json({
                message: 'An error Occured!' + error
            })
        })
}

const phone_edit = (req, res,next) => {
    Phone.findById(req.params.id)
    .then((response) => {
        res.render('phones/edit-product',{title:'Edit Phones', phone: response});
    })
    .catch(error => {
        res.json({
            message: 'An error Occured!' + error
        })
    })
}

const phone_delete = (req, res,next) => {
    Phone.deleteOne({_id: req.params.id})
    .then((response) => {
        res.redirect('back');
    })
    .catch(error => {
        res.json({
            message: 'An error Occured!' + error
        })
    })
}

const phone_update = (req, res,next) => {

    let phone = {
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
        price: req.body.price,
        units: req.body.units
    }

    if(req.file){
        phone.image = '\\' + req.file.path;
    }


    Phone.updateOne({_id: req.params.id},phone)
    .then((response) =>  {
        res.redirect('/stored-phones');
    })
    .catch(error => {
        res.json({
            message: 'An error Occured!' + error
        })
    })
}

module.exports = {
    phone_index,
    phone_all,
    phone_detail,
    phone_create_get,
    phone_create_post,
    phone_delete,
    stored_phones,
    phone_edit,
    phone_update,
}