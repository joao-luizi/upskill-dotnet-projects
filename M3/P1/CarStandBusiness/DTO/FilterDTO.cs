namespace CarStandBusiness.DTO
{
    public class FilterDTO
    {
        public List<int> Marcas { get; set; } = new();
        public List<int> Modelos { get; set; } = new();
        public List<int> Anos { get; set; } = new();
        public bool? Vendido { get; set; }
    }
}
