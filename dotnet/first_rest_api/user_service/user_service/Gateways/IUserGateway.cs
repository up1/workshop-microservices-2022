using System;
namespace user_service.Gateways
{
    public interface IUserGateway
    {
        public Task<GetUsersResponse> GetAllUsersAsync();
        public Task<GetUsersResponse> GetUserByIdAsync(int id);
    }
}

