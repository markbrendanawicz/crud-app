module.exports = {
    // Load the form to add a player - GET
    addPlayerPage: function (request, response) {
        // Load the page
        response.render('edit-player');
    },

    // Add a player to the database - POST
    addPlayer: function (request, response) {
        // Load values from the POST request
        let first_name = request.body.first_name;
        let last_name = request.body.last_name;
        let position = request.body.position;
        let number = request.body.number;

        // Query to add the new player to the database
        let query = `INSERT INTO players (first_name, last_name, position, number)
            VALUES ('${first_name}', '${last_name}', '${position}', ${number});`;

        db.query(query, function (error, result) {
            if (error) {
                // Send server error
                return response.status(500).send(error);
            }

            // New player added successfully, reload homepage
            response.redirect('/');
        });
    }
}