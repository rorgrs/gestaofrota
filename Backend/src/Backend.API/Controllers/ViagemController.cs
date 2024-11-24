using System;
using Backend.Domain.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using Backend.API.Middlewares;
using Backend.Domain.DTOs.Viagem;

namespace Backend.API.Controllers;

[ApiController]
[Route("[controller]")]
public class ViagemController : ControllerBase
{
    private readonly IViagemService _viagemService;

    public ViagemController(IViagemService viagemService)
    {
        _viagemService = viagemService;
    }

    [ValidateToken]
    [HttpGet]
    public async Task<ActionResult<List<ViagemResponse>>> GetAll()
    {
        try
        {
            var result = await _viagemService.GetAll();
            return Ok(result);
        }
        catch (Exception e)
        {
            return StatusCode(500, e.Message);
        }
    }

    [ValidateToken]
    [HttpGet("{id}")]
    public async Task<ActionResult<ViagemResponse>> Get(int id)
    {
        try
        {
            var result = await _viagemService.Get(id);
            return Ok(result);
        }
        catch (Exception e)
        {
            return StatusCode(500, e.Message);
        }
    }

    [ValidateToken]
    [HttpPost]
    public async Task<ActionResult<ViagemResponse>> Save([FromBody] ViagemRequest request)
    {
        try
        {
            var result = await _viagemService.Save(request);
            return Ok(result);
        }
        catch (Exception e)
        {
            return StatusCode(500, e.Message);
        }
    }
    
    [ValidateToken]
    [HttpPost("{id}/parada")]
    public async Task<ActionResult> AddParada(int id, [FromBody] ViagemParadaRequest request)
    {
        try
        {
            await _viagemService.AddParada(id, request);
            return Ok();
        }
        catch (Exception e)
        {
            return StatusCode(500, e.Message);
        }
    }
    
    [ValidateToken]
    [HttpPut("{id}")]
    public async Task<ActionResult<ViagemResponse>> Edit(int id, [FromBody] ViagemRequest request)
    {
        try
        {
            var result = await _viagemService.Edit(id, request);
            return Ok(result);
        }
        catch (Exception e)
        {
            return StatusCode(500, e.Message);
        }
    }
}