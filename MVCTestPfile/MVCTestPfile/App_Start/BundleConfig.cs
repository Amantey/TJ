using System.Web;
using System.Web.Optimization;

namespace MVCTestPfile
{
    public class BundleConfig
    {
        // Дополнительные сведения о Bundling см. по адресу http://go.microsoft.com/fwlink/?LinkId=254725
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new StyleBundle("~/styles/Bootstrap")
                .Include("~/Content/css/bootstrap.css")
                );

            bundles.Add(new StyleBundle("~/styles/Site")
                .Include("~/Content/Site.css")
                .Include("~/Content/themes/base/jquery-ui.css")
                .Include("~/Content/themes/base/jquery.ui.autocomplete.css")
                );

            bundles.Add(new StyleBundle("~/styles/FileUpload")
                .Include("~/Content/FileUpload/jquery.fileupload-ui.css")
                );





            bundles.Add(new ScriptBundle("~/Scripts/Modernizr")
                .Include("~/Scripts/modernizr-*")
                );

            bundles.Add(new ScriptBundle("~/Scripts/jQuery")
                .Include("~/Scripts/jquery-{version}.js")
                .Include("~/Scripts/jquery-ui-{version}.js")
                .Include("~/Scripts/jquery.validate.js")
                );

            bundles.Add(new ScriptBundle("~/Scripts/Bootstrap")
                .Include("~/Scripts/bootstrap/js/bootstrap.js")
                );


            bundles.Add(new ScriptBundle("~/Scripts/FileUpload")
                .Include("~/Scripts/FileUpload/vendor/jquery.ui.widget.js")
                .Include("~/Scripts/FileUpload/tmpl.js")
                .Include("~/Scripts/FileUpload/load-image.js")
                .Include("~/Scripts/FileUpload/canvas-to-blob.js")

                .Include("~/Scripts/FileUpload/jquery.iframe-transport.js")
                .Include("~/Scripts/FileUpload/jquery.fileupload.js")
                .Include("~/Scripts/FileUpload/jquery.fileupload-fp.js")
                .Include("~/Scripts/FileUpload/jquery.fileupload-ui.js")
                //.Include("~/Scripts/FileUpload/locale.js")
                .Include("~/Scripts/FileUpload/main.js")
                );

            bundles.Add(new ScriptBundle("~/Scripts/Knockout")
                .Include("~/Scripts/knockout-{version}.js")
                );
        }
    }
}