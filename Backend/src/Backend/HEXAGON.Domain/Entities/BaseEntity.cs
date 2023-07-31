namespace HEXAGON.Domain.Entities;
public class BaseEntity
{
    public long id { get; set; }
    public DateTime created_at { get; set; } = DateTime.UtcNow;
}