using HEXAGON.Api.Filters;
using HEXAGON.Application.UseCases.User.Delete;
using HEXAGON.Application.UseCases.User.Register;
using HEXAGON.Application.UseCases.User.Update;
using HEXAGON.Communication.Request;
using HEXAGON.Communication.Response;
using HEXAGON.Domain.Entities;
using HEXAGON.Domain.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace HEXAGON.Api.Controllers
{
    [ApiController]
    [ServiceFilter(typeof(UserAuthAttribute))]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        [HttpPost]
        [ProducesResponseType(typeof(ResponseUserJson), StatusCodes.Status201Created)]
        public async Task<IActionResult> RegisterUser([FromServices] IRegisterUserUseCase useCase,
            [FromBody] RequestRegisterUserJson request)
        {
            var result = await useCase.Execute(request);

            return Created(string.Empty, result);
        }

        [HttpGet]
        public async Task<IActionResult> List([FromServices] IUserReadListRepository useCase)
        {
            List<Users> list = await useCase.ListUsers();
            return Ok(list);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id, [FromServices] IUserFindByIdRepository useCase)
        {
            Users user = await useCase.GetUserById(id);
            if (user == null)
            {
                return new ObjectResult(new { Message = "O usuário não foi encontrado." })
                {
                    StatusCode = 404
                };
            }

            return Ok(user);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] RequestUpdateUserJson request,
            [FromServices] IUpdateUserUseCase useCase)
        {
            var result = await useCase.ExecuteUpdate(id, request);
            return Ok(result);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id, [FromServices] IDeleteUserUseCase useCase)
        {
            var result = await useCase.ExecuteDelete(id);
            return Ok(result);
        }


    }


}
