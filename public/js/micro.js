"use strict";

const socket = io();

//Basic view constructor
const populateModule = obj => {

    jQuery('<div/>', {
        
        class: 'kano-module',
        onload: function() {
            
            $(this).append("<img src =" + obj.image + ">");
            $(this).append("<div class = 'title' >" + obj.title + "</div>");
            $(this).append("<div class = 'username' >" + obj.username + "</div>");
            $(this).append("<div class = 'like' >" + obj.likes + "</div>");

        }

    }).appendTo('.module-holder');

}

//Reads the current word the user is up to in the array
const serviceCall = new Promise((resolve,reject) => {

    $.ajax({url: "http://api.kano.me/share?limit=100", success: result => {
        
        if (result !== undefined){

            resolve(result)

        } else {

            reject("service call issue")
        }

    }});

})

const likeHander = arr => {

    if (arr.length === 0 ){
        return "0";
    } else{
        return arr.length
    }

}

jQuery(document).ready($ =>{

    $(".kano-input").on("keyup", function() {
            
        //Strip out uppercase
        let value = $(this).val().toLowerCase();

        //filter and remove divs without search term
        $(".kano-module .title").filter(function() {

            $(this).parent().toggle($(this).text().toLowerCase().indexOf(value) > -1)

        });

        //should be more specific
        if ($("div.title:visible").length === 0){
            
            //should be handled better as always firing
            $(".no-result").remove()
            
            jQuery('<div/>', {
            
                class: 'no-result',
                onload: function() {$(this).append("<div class = 'no-result' >No result</div>");}

            }).appendTo('.module-holder');
        }

    });

    //TODO split this into a seperate file
    serviceCall.then(result => {

        for (let i = 0; i < result.entries.length; i++) {

            let schema = {

                image : result.entries[i].cover_url,
                title: result.entries[i].title,
                username: result.entries[i].user.username,
                likes: likeHander(result.entries[i].likes)

            }

            populateModule(schema)

        }

    }, err => {

        console.log(err)

    })

});