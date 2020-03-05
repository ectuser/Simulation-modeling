"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Router = /** @class */ (function () {
    function Router(app, userData) {
        this.app = app;
        this.userData = userData;
        this.GetMainPage();
    }
    Router.prototype.GetMainPage = function () {
        var _this = this;
        this.app.get('/', function (req, res) {
            res.render("index", _this.userData);
        });
    };
    return Router;
}());
exports.Router = Router;
