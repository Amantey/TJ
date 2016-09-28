namespace ClassLibrary1.Model
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class Студенты_занятия
    {
        [Key]
        [Column(Order = 0)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int Номер_зачетки { get; set; }

        public bool? Явка { get; set; }

        public double? Оценка { get; set; }

        [Key]
        [Column(Order = 1)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int id_занятия { get; set; }

        public virtual Занятия Занятия { get; set; }

        public virtual Студенты Студенты { get; set; }
    }
}
