package com.lojasapato.lojasapato.api.controller;

import com.lojasapato.lojasapato.api.model.UsuarioDTO;
import com.lojasapato.lojasapato.domain.service.UsuarioService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@RestController
@CrossOrigin
@RequestMapping("/usuarios")
public class UsuarioController {
    private final UsuarioService usuarioService;

    @PostMapping
    public ResponseEntity<UsuarioDTO> cadastrarUsuario(@RequestBody UsuarioDTO usuario){
        usuario = this.usuarioService.criarUsuario(usuario);
        return ResponseEntity.status(HttpStatus.CREATED).body(usuario);
    }
    @GetMapping
    public ResponseEntity<List<UsuarioDTO>> listarUsuarios(@RequestParam(required = false) String valorPesquisa,
                                                           @RequestParam(required = false) String tipoPesquisa){
        List<UsuarioDTO> usuarios;
        if(tipoPesquisa != null){
            if (tipoPesquisa.equals("email")) {
                usuarios = this.usuarioService.listarUsuariosDTO(valorPesquisa);
            } else if (tipoPesquisa.equals("cpf")) {
                usuarios = this.usuarioService.listarPorCpf(valorPesquisa);
            }
            else{
                usuarios = this.usuarioService.listarUsuariosDTO(valorPesquisa);
            }
        }else{
            usuarios = this.usuarioService.listarUsuariosDTO(valorPesquisa);
        }

        return ResponseEntity.ok().body(usuarios);
    }
    @GetMapping("/{id}")
    public ResponseEntity<UsuarioDTO> buscarUsuarioPorId(@PathVariable Long id){
        return ResponseEntity.ok().body(this.usuarioService.buscarUsuarioDTO(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletarPorId(@PathVariable Long id){
        this.usuarioService.deletarUsuarioPorId(id);
        return ResponseEntity.noContent().build();
    }
    @PutMapping("/{id}")
    public ResponseEntity<UsuarioDTO> atualizarUsuario(@PathVariable Long id,@RequestBody UsuarioDTO usuario){
        return ResponseEntity.ok().body(this.usuarioService.atualizarUsuario(id, usuario));
    }
    @PutMapping("alterar-senha/{id}")
    public ResponseEntity<UsuarioDTO> alterarSenha(@PathVariable Long id,@RequestBody UsuarioDTO usuario){
        return ResponseEntity.ok().body(this.usuarioService.alterarSenha(id, usuario));
    }
}
