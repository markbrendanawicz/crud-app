module.exports = {
    // Load the form to add a player - GET
    addPlayerPage: function (request, response) {
        // Load the page
        response.render('edit-player');
    },

    addPlayer: function (request, response) {
        console.log(request.body);
        response.redirect('/');
    }
}