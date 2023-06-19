module.exports = function(db) {
    return function(req, res, next) {
        if(req.query.q){
            let q = req.query.q.charAt(0).toUpperCase() + req.query.q.slice(1);
            q = `%${q.split(' ').join('%')}%`;
            const smt = db.prepare(`SELECT t.id, t.name, t.mainscore, COUNT(r.id) AS rcount
                        FROM teachers AS t
                        JOIN reviews AS r ON (t.id = r.tId)
                        WHERE UPPER(name) LIKE UPPER(?)
                        GROUP BY t.name`);
            smt.all(q, function (err, ans) {
                if (err) {
                    return next(err);
                }
                res.locals.data = ans;
                res.locals.searched = req.query.q;
                return next();
            });
        }
        else{
            return next("Kérlek adj meg keresőfeltételt");
        }
    };
};