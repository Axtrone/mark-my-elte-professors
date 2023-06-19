module.exports = function(db) {
    return function(req, res, next) {
        const q = req.params.id;
        const smt = db.prepare(`SELECT * FROM teachers WHERE id = ?`);
        smt.all(q,function (err, ans) {
            if (err || Object.keys(ans).length != 1) {
                return next(err);
            }
            res.locals.tData = ans[0];
            
            const smt2 = db.prepare("SELECT * FROM reviews WHERE tId = ?");
            smt2.all(q, function(err, reviews){
                if (err) {
                    return next(err);
                }
                res.locals.revData = reviews;
                return next();
            });
        });
    };
};