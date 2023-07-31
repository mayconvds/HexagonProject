using System.ComponentModel.DataAnnotations.Schema;

namespace HEXAGON.Domain.Entities;

[Table("users")]
public class Users : BaseEntity
{
    public string name { get; set; }
    public Int16 age { get; set; }
    public string civil_status { get; set; }
    public string document { get; set; }
    public string city { get; set; }
    public string state { get; set; }
}