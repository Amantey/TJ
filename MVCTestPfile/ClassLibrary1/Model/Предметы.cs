namespace ClassLibrary1.Model
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class Предметы
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Предметы()
        {
            Занятия = new HashSet<Занятия>();
            Студенты_Предметы = new HashSet<Студенты_Предметы>();
            Расписание = new HashSet<raspisanie>();
        }

        [Key]
        public int Код_предмета { get; set; }

        [StringLength(50)]
        public string Название { get; set; }

        public int? Количество_часов { get; set; }

        public int? UserId { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Занятия> Занятия { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Студенты_Предметы> Студенты_Предметы { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<raspisanie> Расписание { get; set; }
    }
}
