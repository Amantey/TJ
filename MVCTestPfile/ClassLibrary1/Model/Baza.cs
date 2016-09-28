namespace ClassLibrary1.Model
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;
    using MySql.Data.MySqlClient;
    using MySql.Data.Entity;

    public partial class Baza : DbContext
    {
        public Baza()
            : base("DefaultConnection")
        {
        }

        //public virtual DbSet<Занятия> Занятия { get; set; }
        //public virtual DbSet<Предметы> Предметы { get; set; }
        public virtual DbSet<raspisanie> raspisanies { get; set; }
        //public virtual DbSet<Студенты> Студенты { get; set; }
        //public virtual DbSet<Студенты_занятия> Студенты_занятия { get; set; }
        //public virtual DbSet<Студенты_Предметы> Студенты_Предметы { get; set; }
    }
}
