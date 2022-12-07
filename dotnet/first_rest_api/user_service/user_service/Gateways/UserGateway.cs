using System;
using Newtonsoft.Json;
using static user_service.Gateways.GetUsersResponse;

namespace user_service.Gateways
{
    public class UserGateway: IUserGateway
    {
        private readonly HttpClient _httpClient;

        public UserGateway(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public async Task<GetUsersResponse> GetAllUsersAsync()
        {
            var userResponse = new GetUsersResponse();

            var uri = "https://jsonplaceholder.typicode.com/users";

            var responseString = await _httpClient.GetStringAsync(uri);

            var users = JsonConvert.DeserializeObject<List<User>>(responseString);

            userResponse.Users = users;

            return userResponse;
        }

        public async Task<GetUsersResponse> GetUserByIdAsync(int id)
        {
            var userResponse = new GetUsersResponse();

            var uri = $"https://jsonplaceholder.typicode.com/users?id={id}";

            var responseString = await _httpClient.GetStringAsync(uri);

            var users = JsonConvert.DeserializeObject<List<User>>(responseString);

            userResponse.Users = users;

            return userResponse;
        }
    }
}

