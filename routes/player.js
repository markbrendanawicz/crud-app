module.exports = {
    // Load the form to add a player - GET
    addPlayerPage: function (request, response) {
        // Load the page
        response.render('edit-player', {
            add: true
        });
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
    },

    // Load the form to edit a player - GET
    editPlayerPage: function (request, response) {
        // Get player ID from the request
        let playerId = request.params.id;

        // Query to find information about the player with the given ID
        let query = `SELECT * FROM players WHERE id = ${playerId};`;

        // Execute the query
        db.query(query, function (error, result) {
            if (error) {
                // Send server Error
                return response.status(500).send(error);
            }

            // Load the page
            response.render('edit-player', {
                add: false,
                player: result[0]
            });
        });
    },

    editPlayer: function(request, response) {
        let playerId = request.params.id;
        let first_name = request.body.first_name;
        let last_name = request.body.last_name;
        let position = request.body.position;
        let number = request.body.number;

        let query = `UPDATE players
        SET first_name = '${first_name}', last_name = '${last_name}', position = '${position}', number = ${number}
        WHERE id = ${playerId};`

        db.query(query, function (error, result) {
            if (error) {
                return response.status(500).send(error);
            }

            response.redirect('/');
        });
    },
    
    // Delete a player from the database - GET
    deletePlayer: function (request, response) {
        // Get player ID from request
        let playerId = request.params.id;
    
        // Query to delete the given player
        let query = `DELETE FROM players WHERE id = ${playerId};`;
    
        db.query(query, function (error, result) {
            if (error) {
                // Send server error
                return response.status(500).send(error);
            }
    
            // Delete successful, return to homepage
            response.redirect('/');
        });
    }
}