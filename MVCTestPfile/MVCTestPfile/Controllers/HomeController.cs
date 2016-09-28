using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ClassLibrary1.Model;
using ClassLibrary1;
using WebMatrix.WebData;
using test_jurnal.Filters;

namespace MVCTestPfile.Controllers
{

    public class HomeController : Controller
    {
        PrepJournal prepJournal = new PrepJournal();
        
        [Authorize]
        public ActionResult Index()
        {


            return View();
        }
        [Authorize]
        public ActionResult About()
        {

            return View();
        }
        [Authorize]
        public ActionResult Contact()
        {

            return View();
        }
        [Authorize]
        public ActionResult PartialRaspisanie()
        {
            return PartialView();
        }
        [Authorize]
        public JsonResult GetRaspisanie()
        {
            List<raspisanie> listRasp = new List<raspisanie>();
            listRasp = prepJournal.RaspisPrep(WebSecurity.CurrentUserId);
            return Json(listRasp, JsonRequestBehavior.AllowGet);
        }
        [Authorize]
        public JsonResult AddSubject()
        {
            int day = Convert.ToInt32(Request.Params["d"]);
            int num = Convert.ToInt32(Request.Params["p"]);
            string id = Request.Params["Id"];
            string Название_предмета = Request.Params["Название_предмета"];
            string Номер_аудитории = Request.Params["Номер_аудитории"];
            string Тип_занятия = Request.Params["Тип_занятия"];
            string неделя = Request.Params["неделя"];
            bool? b=null;
            if(неделя.Equals("null")==false)
            {
                b=Convert.ToBoolean(неделя);
            }

            if(id.Equals(""))
            {

                prepJournal.AddSubject(prepJournal.SelectPredmID(Название_предмета,WebSecurity.CurrentUserId), Номер_аудитории, Тип_занятия, b,day,num,WebSecurity.CurrentUserId);
            }
            else
            {
                prepJournal.UpdataSubject(prepJournal.SelectPredmID(Название_предмета, WebSecurity.CurrentUserId), Номер_аудитории, Тип_занятия, b, Convert.ToInt32(id));
            }
            List<raspisanie> listRasp = new List<raspisanie>();
            listRasp = prepJournal.RaspisPrep(WebSecurity.CurrentUserId);
            return Json(listRasp, JsonRequestBehavior.AllowGet);
        }
        [Authorize]
        public JsonResult AddComment()
        {
            string comment = Request["Comment"];
            int id = Convert.ToInt32(Request["Id"]);
            prepJournal.AddComment(comment, id);
            List<raspisanie> listRasp = new List<raspisanie>();
            listRasp = prepJournal.RaspisPrep(WebSecurity.CurrentUserId);
            return Json(listRasp, JsonRequestBehavior.AllowGet);
        }
        [Authorize]
        public JsonResult AddGroup()
        {
            string gr1 = Request["gr1"];
            string gr2 = Request["gr2"];
            string gr3 = Request["gr3"];
            int id = Convert.ToInt32(Request["Id"]);
            prepJournal.AddGroup(gr1,gr2,gr3, id);
            List<raspisanie> listRasp = new List<raspisanie>();
            listRasp = prepJournal.RaspisPrep(WebSecurity.CurrentUserId);
            return Json(listRasp, JsonRequestBehavior.AllowGet);
        }
        [Authorize]
        public JsonResult SelectStud()
        {
           return Json(prepJournal.SelectStud(Request["grup"].ToString()), JsonRequestBehavior.AllowGet);
        }
      
 
    }
}
