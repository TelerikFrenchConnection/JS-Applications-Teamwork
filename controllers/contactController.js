import _ from 'underscore';
import db from 'dbContext';

import templatesHelper from '../views/helpers/templatesHelper.js';
import pagesHelper from '../views/helpers/pagesHelper.js';

import contactModel from '../models/contactModel.js';

class contactsController {
    load() {
        pagesHelper.append('contact').then(function() {
            (function initialize() {
                var mapCanvas = document.getElementById('map');
                var mapOptions = {
                    center: new google.maps.LatLng(40.7403522, -73.825769),
                    zoom: 8,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };
                var map = new google.maps.Map(mapCanvas, mapOptions);
                map.setZoom(12);
            })();
        });
    }

    contactPost(sammy){
            var name = sammy.params['name'];
            var email = sammy.params['email'];
            var title = sammy.params['title'];
            var text = sammy.params['text'];

            contactModel.addContact(email, name, title, text)
                .then(function() {
                    sammy.redirect('#/home');
                }, function(errors) {
                    templatesHelper.set('warning', errors, '.warning');
                });
        }
}

export default new contactsController;