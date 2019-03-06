let db_connection = require('../models/db_connection');

// Getting all posts
exports.index = (req, res) => {
    (async () => {
        try {
            await db_connection.query(`SELECT * FROM post`, (err, results) => {
                if(err) {
                    return res.send(err);
                } else {
                    return res.json({ results });
                }  
            });
        } finally {
            db_connection.end();
        }
    })()
};

// Get an individual post
exports.getPostById = (req, res) => {
      // Testing if the id is a number
      if(!isNaN(req.params.id)) {
        (async () => {
            try {
                await db_connection.query(`SELECT * FROM post WHERE post_id = ${req.params.id}`, (err, results) => {
                    if(err) {
                        return res.send(err);
                    } else {
                        // Testing if there'is posts with this id
                        if (Object.entries(results).length === 0) {
                            return res.send(`There is no post with ${req.params.id} id!`);
                        } else {
                            return res.json({ results });
                        }
                    }  
                });
            } finally {
                db_connection.end();
            }
        })()
    } else {
        res.send('invalid id');
    }
};

// Create a post
exports.createPost = (req, res) => {
    // Getting the title and content to new post
    const { title, content } = req.body;

    (async () => {
        try {
            const INSERT_POST = `INSERT INTO post (author, title, content, category_name) VALUES ('Jon Doe', '${title}', '${content}', 'bugs')`;
            await db_connection.query(INSERT_POST, (err, result) => {
                if (err) {
                    return res.send(`Error: ${err}`);
                } else {
                    return res.send(`Successfully added post!`);
                }
            })
        } finally {
            db_connection.end();
        }
    })();
};

// Delete a post
exports.deletePost = (req, res) => {
    // Testing if the id is a number
    if(!isNaN(req.params.id)) {
        (async () => {
            try {
                const DELETE_POST = `DELETE FROM post WHERE post_id = ${req.params.id}`;
                await db_connection.query(DELETE_POST, (err, result) => {
                    if (err) {
                        return res.send(`Error: ${err}`);
                    } else {
                        return res.send(`Successfully deleted post`);
                    }
                });
            } finally {
                db_connection.end();
            }
        })();
    } else {
        res.send('invalid id');
    }
}

// Update a post
exports.updatePostById = async (req, res) => {
    // Getting the new title and content
    let { title, content } = req.body;
    // Getting the post id
    let id = req.params.id;

    if(!isNaN(req.params.id)) {
        try {
            let sql = `SELECT * FROM post
                        WHERE post_id = ${id}`;
            await db_connection.query(sql, (err, row) => {
                if(err) {
                    logger.error('Error in DB');
                    logger.debug(err);
                    return;
                } else {
                    // Testing if post exists
                    if (row && row.length ) {
                        // Post exists
                        // Putting the new content into post
                        (async () => {
                            try {
                                const UPDATE_POST = `UPDATE post
                                                    SET title= '${title}', content= '${content}'
                                                    WHERE post_id = ${id}`;
                
                                await db_connection.query(UPDATE_POST, (err, result) => {
                                    if (err) {
                                        return res.send(`Error: ${err}`);
                                    } else {
                                        return res.send(`Successfully updated post!`);
                                    }
                                })
                            } finally {
                                db_connection.end();
                            }
                        })();
                    } else {
                        res.send('No post was found!');
                    }
                }     
            });
        } finally {
            db_connection.end();
        }
    } else {
        res.send('invalid id');
    }
}