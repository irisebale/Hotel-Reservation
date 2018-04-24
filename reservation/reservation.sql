
--login
create function login(par_username character varying, par_password character varying) returns character varying
LANGUAGE plpgsql
AS $$
declare
    loc_usrnm character varying;
    loc_pwd character varying;
    loc_res character varying;
  begin
     select into loc_usrnm username, loc_pwd, password from login
       where username = par_username and password = par_password;

     if loc_usrnm isnull AND loc_pwd isnull then
       loc_res = 'Error';
     else
       loc_res = 'ok';
     end if;
     return loc_res;
  end;
$$;

-- reservation
create or REPLACE FUNCTION reserves(IN hnames text, IN fname text, IN lname text, IN cnum BIGINT, IN rsize text, IN checkins date, IN checkouts date, IN dur text, IN rnum text) RETURNS Text AS
  $$
  DECLARE
    loc_res text;
  BEGIN
      INSERT INTO reservation
          (hname, firstname, lastname, contactnum, roomsize, checkin, checkout, duration, roomnum)
      VALUES (hnames, fname, lname, cnum, rsize, checkins, checkouts, dur, rnum);
    loc_res = 'stored';
    return loc_res;
  END;
  $$

  LANGUAGE 'plpgsql' VOLATILE;



create or replace function view(out TEXT, out TEXT, out TEXT,  out BIGINT, out TEXT, out date, out date, out TEXT, out TEXT) returns setof record as
$$

  select hname, firstname, lastname, contactnum, roomsize, checkin, checkout, duration, roomnum from reservation ;
$$
 language 'sql';


create function getpassword(par_username character varying) returns character varying
LANGUAGE plpgsql
AS $$
declare
    loc_password character varying;
  begin
     select into loc_password password from login where username = par_username;
     if loc_password isnull then
       loc_password = 'null';
     end if;
     return loc_password;
 end;
$$;


create or replace function delete_reservation( in del text) returns text as
$$
  declare
    loc_res text;
    

  begin
    if del NOTNULL then

      DELETE from reservation;
       loc_res = 'ok';

     else
       loc_res = 'Error';
     end if;
     return loc_res;
  end;
$$
 language 'plpgsql';


create or replace function searchhotel(in par_hotelname text, in random text, out TEXT, out TEXT, out TEXT, out INT, out BOOLEAN) returns setof record as
  $$

    select hotelname, address, contact_num, price, true from "hotels" where "hotelname" ilike par_hotelname;
  $$
   language 'sql';

select searchhotel('Alya Vista', '');
select searchhotel('Kingsway Inn', '');