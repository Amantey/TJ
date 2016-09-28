using MVCTestPfile.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MVCTestPfile.Controllers
{
    public class RaspController : Controller
    {
        private mydbEntities Model = new mydbEntities();

        // GET: Rasp
        public ActionResult Index()
        {
            List<raspisanie> rasp = Model.raspisanie.ToList();

            return View(rasp);
        }
    }
}