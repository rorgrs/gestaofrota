https://dotnet.microsoft.com/pt-br/download/dotnet/8.0

Na coluna da esquerda da pagina:
SDK 8.0.403 -> Windows -> Clicar no x64 roxinho

Na coluna da direita:
Runtime do ASP.NET Core 8.0.10  -> Windows -> Clicar no x64 roxinho

No terminal:
dotnet tool install --global dotnet-ef

Pra rodar migrations:
Botao direito no Backend.Infrastructure
EntityFrameworkCore -> Add -> Update (ou Remove se quer gerar dnv antes de commitar)