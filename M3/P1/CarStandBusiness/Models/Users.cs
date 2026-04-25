

namespace CarStandBusiness.Models
{
    public class Users
    {
        public long ID_User { get; set; }
        public string UserName { get; set; } = null!;
        public string PassWord { get; set; } = null!;
        public string Role { get; set; } = null!;
    }
}
