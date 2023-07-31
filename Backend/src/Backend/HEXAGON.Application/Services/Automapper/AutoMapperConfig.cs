using AutoMapper;
using HEXAGON.Communication.Request;

namespace HEXAGON.Application.Services.Automapper;

public class AutoMapperConfig : Profile
{
    public AutoMapperConfig()
    {
        CreateMap<Communication.Request.RequestRegisterUserJson, Domain.Entities.Users>();
        CreateMap<Communication.Request.RequestUpdateUserJson, Domain.Entities.Users>();
    }
}