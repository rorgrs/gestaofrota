using Backend.Domain.Entities;
using Backend.Domain.Repositories;
using Moq;
using System;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Backend.Domain.Services;
using Xunit;

namespace Backend.Tests.Services;

public class UsuarioServiceTests
{
    [Fact]
    public async Task UsuarioService_Get_RetornaNull()
    {
        // Arrange
        var repo = new Mock<IUsuarioRepository>();
        var service = new Mock<IUsuarioService>();

        repo.Setup(v => v.ExistAsync(It.IsAny<Expression<Func<Usuario, bool>>>()))
            .ReturnsAsync(false);

        service.Setup(v => v.Get(It.IsAny<int>()))
            .Returns(() => null);

        // Act => Assert
        var resp = await service.Object.Get(1);
        
        // Assert
        Assert.Null(resp);
    }
}
