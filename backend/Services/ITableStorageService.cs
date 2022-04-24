using System.Threading.Tasks;
using SharlotteMason.Entities;

namespace SharlotteMason.Services
{
    public interface ITableStorageService
    {
        Task<HomeSchool> RetrieveAsync(string category, string id);
        Task<HomeSchool> InsertOrMergeAsync(HomeSchool entity);
        Task<HomeSchool> DeleteAsync(HomeSchool entity);
    }
}