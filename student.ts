export class student{
    nombre : string;
    codigo : string;
    cedula: string;
    edad : number;
    direccion : string;
    telefono:string;
    imagen : string
    constructor(nombre: string, codigo: string, cedula: string, edad : number, direccion : string, telefono :string, imagen : string){
        this.nombre = nombre;
        this.codigo = codigo;
        this.cedula = cedula;
        this.edad = edad;
        this.direccion = direccion;
        this.telefono =telefono;
        this.imagen = imagen;
    }
}