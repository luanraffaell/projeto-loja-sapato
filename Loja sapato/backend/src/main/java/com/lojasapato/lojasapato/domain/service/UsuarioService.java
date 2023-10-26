package com.lojasapato.lojasapato.domain.service;

import com.lojasapato.lojasapato.api.model.UsuarioDTO;
import com.lojasapato.lojasapato.domain.exception.EntidadeNaoEncontradaException;
import com.lojasapato.lojasapato.domain.exception.NegocioException;
import com.lojasapato.lojasapato.domain.model.TipoUsuario;
import com.lojasapato.lojasapato.domain.model.Usuario;
import com.lojasapato.lojasapato.infrastructure.repositories.UsuarioRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
public class UsuarioService {
    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    public Usuario findUsuarioByEmail(String email){
        Optional<Usuario> usuarioAtual = this.usuarioRepository.findUsuarioByEmail(email);
        if(usuarioAtual.isEmpty()){
            throw new EntidadeNaoEncontradaException("Não foi encontrado um usuário com o email:"+email);
        }
        return usuarioAtual.get();
    }
    public List<UsuarioDTO> listarUsuariosDTO(String email){
        if(email == null || email.isEmpty()){
            return this.listarUsuarios().stream()
                    .map(usr -> new UsuarioDTO(usr)).collect(Collectors.toList());
        }
        List<Usuario> usuarioNãoEncontrado = this.usuarioRepository.findByEmailContainingIgnoreCase(email)
                .orElseThrow(() -> new EntidadeNaoEncontradaException("Usuario não encontrado"));
        return usuarioNãoEncontrado.stream().map(u -> new UsuarioDTO(u)).collect(Collectors.toList());
    }
    public List<UsuarioDTO> listarPorCpf(String cpf){
        final List<Usuario> usuarioNãoEncontrado = this.usuarioRepository.findByCpfContainingIgnoreCase(cpf)
                .orElseThrow(() -> new EntidadeNaoEncontradaException("Usuario não encontrado"));
        return usuarioNãoEncontrado.stream().map(u -> new UsuarioDTO(u)).collect(Collectors.toList());
    }
    public List<UsuarioDTO> listarPorId(String id){
        if(id == null || id.isEmpty()){
            return this.listarUsuarios().stream()
                    .map(usr -> new UsuarioDTO(usr)).collect(Collectors.toList());
        }
         Long idUsuario = Long.valueOf(id);
        Optional<Usuario> byId = this.usuarioRepository.findById(idUsuario);
        if(byId.isEmpty()){
            return null;
        }
        return List.of(new UsuarioDTO(byId.get()));
    }
    @Transactional
    public UsuarioDTO criarUsuario(UsuarioDTO usuario){
        Optional<Usuario> usuarioAtual = this.usuarioRepository.findUsuarioByEmail(usuario.getEmail());
        if(usuarioAtual.isPresent()){
            throw new NegocioException("Já existe um usuario cadastrado com o email:"+usuario.getEmail());
        }
        Usuario novo = this.dtoToModel(usuario);

        return new UsuarioDTO(this.usuarioRepository.save(novo));
    }
    @Transactional
    public Usuario criarUsuario(Usuario usuario){
        Optional<Usuario> usuarioAtual = this.usuarioRepository.findUsuarioByEmail(usuario.getEmail());
        if(usuarioAtual.isPresent()){
            throw new NegocioException("Já existe um usuario cadastrado com o email:"+usuario.getEmail());
        }
        return this.usuarioRepository.save(usuario);
    }
    public List<Usuario> listarUsuarios(){
        return this.usuarioRepository.findAll();
    }
    public Usuario buscarOuFalhar(Long id){
        return this.usuarioRepository.findById(id)
                .orElseThrow(() -> new EntidadeNaoEncontradaException("Usuario com o id "+id+" não foi encontrado!"));
    }
    public UsuarioDTO buscarUsuarioDTO(Long id){
        Usuario usuarioAtual = this.buscarOuFalhar(id);
        return new UsuarioDTO(usuarioAtual);
    }
    @Transactional
    public UsuarioDTO atualizarUsuario(Long id, UsuarioDTO usuarioDTO){
        Usuario usuarioAtual = this.buscarOuFalhar(id);
        usuarioDTO.setSenha("00");
        Usuario usuario = this.dtoToModel(usuarioDTO);
        usuario.setId(usuarioAtual.getId());
        usuario.setSenha(usuarioAtual.getSenha());
        return new UsuarioDTO(this.usuarioRepository.save(usuario));
    }
    @Transactional
    public UsuarioDTO alterarSenha(Long id, UsuarioDTO usuarioDTO){
        Usuario usuarioAtual = this.buscarOuFalhar(id);
        usuarioAtual.setSenha(passwordEncoder.encode(usuarioDTO.getSenha()));
        return new UsuarioDTO(this.usuarioRepository.save(usuarioAtual));
    }

    @Transactional
    public void deletarUsuarioPorId(Long id){
        this.usuarioRepository.deleteById(id);
    }
    private Usuario dtoToModel(UsuarioDTO usuario){
        Usuario usuarioNovo = new Usuario();
        usuarioNovo.setNome(usuario.getNome());
        usuarioNovo.setEmail(usuario.getEmail());
        usuarioNovo.setSenha(this.passwordEncoder.encode(usuario.getSenha()));
        usuarioNovo.setTipoUsuario(TipoUsuario.valueOf(usuario.getTipoUsuario()));
        usuarioNovo.setCpf(usuario.getCpf());
        return usuarioNovo;
    }

}
