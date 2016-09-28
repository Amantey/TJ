namespace ClassLibrary1.Model
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class Занятия
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Занятия()
        {
            Студенты_занятия = new HashSet<Студенты_занятия>();
        }

        public int? Номер_занятия { get; set; }

        [StringLength(50)]
        public string Тип_занятия { get; set; }

        public int Код_предмета { get; set; }

        public int UserId { get; set; }

        [StringLength(150)]
        public string Тема { get; set; }

        [StringLength(50)]
        public string Группа1 { get; set; }

        [StringLength(50)]
        public string Группа2 { get; set; }

        [StringLength(50)]
        public string Группа3 { get; set; }

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int id_занятия { get; set; }

        public DateTime? Дата { get; set; }

        [StringLength(150)]
        public string Примечание { get; set; }

        [StringLength(50)]
        public string Подгруппа { get; set; }

        public virtual Предметы Предметы { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Студенты_занятия> Студенты_занятия { get; set; }
    }
}
