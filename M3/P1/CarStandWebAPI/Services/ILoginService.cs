using CarStandBusiness.DTO;


namespace CarStandWebAPI.Services
{
    public interface ILoginService
    {
        public string? GetToken(LoginDTO loginDTO, string tag);

        public void DeleteAll(string tag);
    }
}
