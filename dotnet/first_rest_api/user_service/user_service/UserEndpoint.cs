using System;
using user_service.Gateways;

namespace user_service;

public static class UserEndpoints
{
    public static void MapUsersEndpoints(this WebApplication app)
    {
        app.MapGet("/v1/users", GetAllUsers);
        app.MapGet("/v1/users/{id}", GetUserById);
    }

    public static void AddUserServices(this IServiceCollection service)
    {
        service.AddHttpClient<IUserGateway, UserGateway>();
    }

    internal static IResult GetAllUsers(IUserGateway service)
    {
        var users = service.GetAllUsersAsync().Result.Users;

        return users is not null ? Results.Ok(users) : Results.NotFound();
    }

    internal static IResult GetUserById(IUserGateway service, int id)
    {
        var user = service.GetUserByIdAsync(id).Result.Users.SingleOrDefault();

        return user is not null ? Results.Ok(user) : Results.NotFound();
    }
}
