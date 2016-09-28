namespace ClassLibrary1.Model
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class Студенты
    {
       


        public string Фамилия { get; set; }


        public string Имя { get; set; }


        public string Отчество { get; set; }

        public DateTime? Дата_рождения { get; set; }
    }
}
