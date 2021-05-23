export interface RespuestaPosts {
    ok: boolean;
    pagina: number;
    posts: Post[];
  }

  export interface Post {
    _id?: string;
    passSecure?: string;
    cuenta?: string;
    imagen?: string;
    categoria?: string;
    descripcion?: string;
    usuario?: Usuario;
    created?: string;
  }

  export interface Usuario {
    _id?: string;
    nombre?: string;
    email?: string;
    password?: string;
  }

  export interface Categoria{
    _id?: string;
    nombre?: string;
  }

  export interface RespuestaCategoria {
    ok: boolean,
    pagina: number;
    categorias: Categoria[];
  }