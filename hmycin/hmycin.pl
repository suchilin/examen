:- dynamic conocido/1.

abrir_conexion:-
                odbc_connect('hmycin',_,
                [user(prolog),password('normita'),
                alias(hmCon),
                open(once)]).

consulta:-
    abrir_conexion,
    haz_diagnostico(X),
    escribe_diagnostico(X).

consulta:-
    write('No hay suficiente conocimiento para elaborar un diagnostico.'),
    clean_scratchpad.

haz_diagnostico(Diagnosis):-
    conocimiento(Diagnosis, ListaDeSintomas),
    prueba_presencia_de(ListaDeSintomas).

prueba_presencia_de([]).

prueba_presencia_de([Head | Tail]):- 
    prueba_verdad_de(Head),
    prueba_presencia_de(Tail).    

prueba_verdad_de(Sintoma):- conocido(Sintoma).
prueba_verdad_de(Sintoma):- not(conocido(is_false(Sintoma))),
pregunta_sobre(Sintoma, Reply), Reply = si.
pregunta_sobre(Sintoma, Reply):- write('Es verdad que '),
    write(Sintoma), write('? '),nl,
    read(Respuesta),
    process(Sintoma, Respuesta, Reply).

process(Sintoma, si, si):- asserta(conocido(Sintoma)).
process(Sintoma, no, no):- asserta(conocido(is_false(Sintoma))).
process(Sintoma, porque, Reply):- nl,
    write('Estoy investigando la hipotesis siguiente: '),
    write(Diagnosis), write('.'), nl, write('Para esto necesito saber si '),
    write(Sintoma), write('.'), nl, pregunta_sobre(Diagnosis, Sintoma, Reply).

process(Sintoma, Respuesta, Reply):- Respuesta \== no,
    Respuesta \== si, Respuesta \== porque, nl,
    write('Debes contestar si, no o porque.'), nl,
    pregunta_sobre(Sintoma, Reply).

escribe_diagnostico(Diagnosis):- write('El diagnostico es '),
write(Diagnosis), write('.'), nl.
ofrece_explicacion_diagnostico(Diagnosis):-
pregunta_si_necesita_explicacion(Respuesta),
actua_consecuentemente(Diagnosis, Respuesta).
pregunta_si_necesita_explicacion(Respuesta):-
write('Quieres que justifique este diagnostico? '),
read(RespuestaUsuario),
asegura_respuesta_si_o_no(RespuestaUsuario, Respuesta).
asegura_respuesta_si_o_no(si, si).
asegura_respuesta_si_o_no(no, no).
asegura_respuesta_si_o_no(_, Respuesta):- write('Debes contestar si o no.'),
pregunta_si_necesita_explicacion(Respuesta).
actua_consecuentemente(no).
actua_consecuentemente(si):- conocimiento(ListaDeSintomas),
write('Se determino este diagnostico porque se encontraron los siguentes
sintomas: '), nl,
escribe_lista_de_sintomas(ListaDeSintomas).
escribe_lista_de_sintomas([]).
escribe_lista_de_sintomas([Head | Tail]):-
write(Head), nl, escribe_lista_de_sintomas(Tail).
clean_scratchpad:- retract(conocido(_)), fail.
clean_scratchpad.
conocido(_):- fail.
not(X):- X,!,fail.
not(_).


conocimiento(Enfermedad, Sintomas):-
                enfermedades(Enfermedad),
                listaSintomas(Enfermedad, Sintomas).

enfermedades(Enfermedad):-
                odbc_query(hmCon, "SELECT nombre FROM enfermedad",row(Enfermedad)).



listaSintomas(Enfermedad, Sintomas) :-
         qbuild(Enfermedad,Q),
        findall(Sintoma,
                odbc_query(hmCon,Q,
                row(Sintoma)),
                Sintomas).
qbuild(Enfermedad, Q):- format(atom(Q), "select nombre_sint from sintoma where enfermedad_id = (select id from enfermedad where nombre = '~w\')",[Enfermedad]).














