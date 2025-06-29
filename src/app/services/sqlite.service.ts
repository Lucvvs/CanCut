import { Injectable } from '@angular/core';
import {
  CapacitorSQLite,
  SQLiteConnection,
  SQLiteDBConnection,
  capSQLiteChanges,
  capSQLiteValues
} from '@capacitor-community/sqlite';

@Injectable({ providedIn: 'root' })
export class SqliteService {
  private sqlite: SQLiteConnection;
  private db!: SQLiteDBConnection;
  private readonly DB_NAME = 'cancut.db';
  private readonly DB_VERSION = 1;

  constructor() {
    // Creamos el wrapper de SQLite
    this.sqlite = new SQLiteConnection(CapacitorSQLite);
  }

  /** Inicializa la BDD, crea tablas y siembra un usuario de prueba */
  public async initialize(): Promise<void> {
    // 1️⃣ Verifica consistencia y abre/recupera conexión
    await this.sqlite.checkConnectionsConsistency();
    const { result: isConn } = await this.sqlite.isConnection(this.DB_NAME, false);
    if (isConn) {
      this.db = await this.sqlite.retrieveConnection(this.DB_NAME, false);
    } else {
      this.db = await this.sqlite.createConnection(
        this.DB_NAME,
        false,
        'no-encryption',
        this.DB_VERSION,
        false
      );
    }

    // 2️⃣ Ábrela y activa claves foráneas
    await this.db.open();
    await this.db.execute(`PRAGMA foreign_keys = ON;`);

    // 3️⃣ Crea tablas si no existen
    const createTablesSQL = `
      CREATE TABLE IF NOT EXISTS Usuarios(
        id INTEGER PRIMARY KEY NOT NULL,
        nombre TEXT NOT NULL,
        apellido TEXT NOT NULL,
        fechaNacimiento TEXT NOT NULL,
        comuna TEXT NOT NULL,
        direccion TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
      );
      CREATE TABLE IF NOT EXISTS Contacto(
        id INTEGER PRIMARY KEY NOT NULL,
        nombre TEXT NOT NULL,
        email TEXT NOT NULL,
        tipoSolicitud TEXT NOT NULL,
        mensaje TEXT NOT NULL
      );
      CREATE TABLE IF NOT EXISTS Reserva(
        id INTEGER PRIMARY KEY NOT NULL,
        nombreMascota TEXT NOT NULL,
        edadMascota INTEGER NOT NULL CHECK(edadMascota >= 0),
        tamanoMascota TEXT NOT NULL,
        fecha TEXT NOT NULL,
        hora TEXT NOT NULL,
        lugarEncuentro TEXT NOT NULL,
        sucursal TEXT NOT NULL
      );
    `;
    await this.db.execute(createTablesSQL);

    // 4️⃣ Inserta un usuario de prueba si no existe
    const seedUserStmt = `
      INSERT OR IGNORE INTO Usuarios
        (nombre, apellido, fechaNacimiento, comuna, direccion, email, password)
      VALUES (?,?,?,?,?,?,?);
    `;
    await this.db.run(seedUserStmt, [
      'Tester',            // nombre
      'Automatico',        // apellido
      '1970-01-01',        // fechaNacimiento
      'Santiago',          // comuna
      'Av. Prueba 1313',   // direccion
      'test@cancut.com',   // email
      'tester123'          // password (texto plano SOLO para pruebas)
    ]);
  }

  /** Cierra la conexión */
  public async close(): Promise<void> {
    await this.db.close();
    await this.sqlite.closeConnection(this.DB_NAME, false);
  }

  // — Métodos para Usuarios —

  public async addUsuario(u: {
    nombre: string;
    apellido: string;
    fechaNacimiento: string;
    comuna: string;
    direccion: string;
    email: string;
    password: string;
  }): Promise<capSQLiteChanges> {
    const stmt = `
      INSERT INTO Usuarios
        (nombre, apellido, fechaNacimiento, comuna, direccion, email, password)
      VALUES (?,?,?,?,?,?,?);
    `;
    return this.db.run(stmt, [
      u.nombre,
      u.apellido,
      u.fechaNacimiento,
      u.comuna,
      u.direccion,
      u.email,
      u.password
    ]);
  }

  public async getUsuarios(): Promise<any[]> {
    const res: capSQLiteValues = await this.db.query('SELECT * FROM Usuarios;', []);
    return res.values ?? [];
  }

  /**
   * Verifica credenciales de login
   */
  public async authenticate(email: string, password: string): Promise<boolean> {
    const res: capSQLiteValues = await this.db.query(
      'SELECT id FROM Usuarios WHERE email = ? AND password = ?;',
      [email, password]
    );
    return (res.values ?? []).length > 0;
  }

  /**
   * Obtiene los datos completos de un usuario
   */
  public async getUsuario(email: string): Promise<any | null> {
    const res: capSQLiteValues = await this.db.query(
      'SELECT * FROM Usuarios WHERE email = ?;',
      [email]
    );
    return (res.values ?? [null])[0];
  }

  // — Métodos para Contacto —

  public async addContacto(c: {
    nombre: string;
    email: string;
    tipoSolicitud: string;
    mensaje: string;
  }): Promise<capSQLiteChanges> {
    const stmt = `
      INSERT INTO Contacto
        (nombre, email, tipoSolicitud, mensaje)
      VALUES (?,?,?,?);
    `;
    return this.db.run(stmt, [
      c.nombre,
      c.email,
      c.tipoSolicitud,
      c.mensaje
    ]);
  }

  public async getContactos(): Promise<any[]> {
    const res: capSQLiteValues = await this.db.query('SELECT * FROM Contacto;', []);
    return res.values ?? [];
  }

  // — Métodos para Reserva —

  public async addReserva(r: {
    nombreMascota: string;
    edadMascota: number;
    tamanoMascota: string;
    fecha: string;
    hora: string;
    lugarEncuentro: string;
    sucursal: string;
  }): Promise<capSQLiteChanges> {
    const stmt = `
      INSERT INTO Reserva
        (nombreMascota, edadMascota, tamanoMascota, fecha, hora, lugarEncuentro, sucursal)
      VALUES (?,?,?,?,?,?,?);
    `;
    return this.db.run(stmt, [
      r.nombreMascota,
      r.edadMascota,
      r.tamanoMascota,
      r.fecha,
      r.hora,
      r.lugarEncuentro,
      r.sucursal
    ]);
  }

  public async getReservas(): Promise<any[]> {
    const res: capSQLiteValues = await this.db.query(
      'SELECT * FROM Reserva ORDER BY id DESC;',
      []
    );
    return res.values ?? [];
  }
}