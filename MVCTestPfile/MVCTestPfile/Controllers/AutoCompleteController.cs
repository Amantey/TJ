using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ClassLibrary1;
using WebMatrix.WebData;
namespace MVCTestPfile.Controllers
{
    public class AutoCompleteController : Controller
    {
        //
        // GET: /AutoComplete/
        PrepJournal pr = new PrepJournal();
        public ActionResult Index()
        {

            return View();
        }
        [Authorize]
        public JsonResult GetGroup()
        {
            return Json(pr.ListGrup().ToList(), JsonRequestBehavior.AllowGet);
        }
        [Authorize]
        public JsonResult GetPredmet()
        {
            return Json(pr.ListPredmet(WebSecurity.CurrentUserId).ToList(), JsonRequestBehavior.AllowGet);
        }
    }
}
