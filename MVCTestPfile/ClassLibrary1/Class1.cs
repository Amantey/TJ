using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Collections;
using System.Data;
using System.Linq;
using System.Text;
using MySql.Data.MySqlClient;
namespace ClassLibrary1
{
    public class PrepJournal
    {
        private MySqlConnection _conn  {get;set;}
        public PrepJournal()
        {
            MySqlConnectionStringBuilder mscsb;
            mscsb = new MySqlConnectionStringBuilder();
            _conn = new MySqlConnection();
            mscsb.Server = "127.0.0.1";
            mscsb.Database = "test2";
            mscsb.UserID = "root";
            mscsb.Password = "1111";

            _conn.ConnectionString = mscsb.ConnectionString;

        }
        public PrepJournal(string connection)
        {
            _conn.ConnectionString = connection;
        }
       
        public DataTable getdata(string qs)
        {
            DataTable dt = new DataTable();
            try
            {
                _conn.Open();


                using (MySqlCommand com = new MySqlCommand(qs, _conn))
                {


                    using (MySqlDataReader dr = com.ExecuteReader())
                    {
                        dt.Load(dr);

                    }
                }
                _conn.Close();
            }
            catch { }
            return dt;
        }

        public DataTable savestud
        {
          
            set
            {
                  _conn.Open();
                string qs = @"select * from studenti";
                MySqlDataAdapter adapter = new MySqlDataAdapter(new MySqlCommand(qs, _conn));
                MySqlCommandBuilder comandB = new MySqlCommandBuilder(adapter);
                try
                {

                    adapter.Update(value);


                }

                catch { comandB = null; }
                _conn.Close();
            }
         
        }
        public DataTable savepredm
        {

            set
            {
                _conn.Open();
                string qs = @"select * from predmeti";
                MySqlDataAdapter adapter = new MySqlDataAdapter(new MySqlCommand(qs, _conn));
                MySqlCommandBuilder comandB = new MySqlCommandBuilder(adapter);
                try
                {

                    adapter.Update(value);


                }

                catch { comandB = null; }
                _conn.Close();
            }

        }
        public DataTable savezan
        {

            set
            {
                _conn.Open();
               string qs = @"select * from zanyatiya";
                MySqlDataAdapter adapter = new MySqlDataAdapter(new MySqlCommand(qs, _conn));
                MySqlCommandBuilder comandB = new MySqlCommandBuilder(adapter);
                try
                {

                    adapter.Update(value);


                }

                catch { comandB = null; }
                _conn.Close();
            }

        }
        public DataTable saverasp
        {

            set
            {
                _conn.Open();
               string qs = @"select * from raspisanie";
                MySqlDataAdapter adapter = new MySqlDataAdapter(new MySqlCommand(qs, _conn));
                MySqlCommandBuilder comandB = new MySqlCommandBuilder(adapter);
                try
                {

                    adapter.Update(value);


                }

                catch { comandB = null; }
                _conn.Close();
            }

        }
        public DataTable savestudpr
        {

            set
            {
                _conn.Open();
               string qs = @"select * from studpr";
                MySqlDataAdapter adapter = new MySqlDataAdapter(new MySqlCommand(qs, _conn));
                MySqlCommandBuilder comandB = new MySqlCommandBuilder(adapter);
                try
                {

                    adapter.Update(value);


                }

                catch { comandB = null; }
                _conn.Close();
            }

        }
        public DataTable savestudzan
        {

            set
            {
                _conn.Open();
                string qs = @"select * from studzan";


                MySqlDataAdapter adapter = new MySqlDataAdapter(new MySqlCommand(qs, _conn));
                MySqlCommandBuilder comandB = new MySqlCommandBuilder(adapter);
                try
                {

                    adapter.Update(value);


                }

                catch { comandB = null; }
                _conn.Close();
            }

        }
        public DataTable StudPoGr(string gr, string podgr)
        {
            _conn.Open();
            using (MySqlCommand cm = new MySqlCommand("StudPoGr", _conn))
            {
                DataTable dt = new DataTable();
                try
                {

                    cm.CommandType = CommandType.StoredProcedure;
                    MySqlParameter param = new MySqlParameter();
                    param.ParameterName = "@gr";
                    param.Direction = ParameterDirection.Input;
                    param.MySqlDbType = MySqlDbType.String;
                    param.Value = gr;
                    cm.Parameters.Add(param);
                    MySqlParameter param1 = new MySqlParameter();
                    param1.ParameterName = "@podgr";
                    param1.Direction = ParameterDirection.Input;
                    param1.MySqlDbType = MySqlDbType.String;
                    param1.Value = podgr;
                    cm.Parameters.Add(param1);
                    MySqlDataAdapter da = new MySqlDataAdapter(cm);
                    
                    da.Fill(dt);
                    _conn.Close();
                    return dt;
                   
                }
                catch
                {
                    _conn.Close();
                    return null;
                }
               
            }
        }
        public DataTable PrimDateGr(string gr, DateTime d)
        {
            _conn.Open();
            using (MySqlCommand cm = new MySqlCommand("PrimDateGr", _conn))
            {
                try
                {

                    cm.CommandType = CommandType.StoredProcedure;
                    MySqlParameter param = new MySqlParameter();
                    param.ParameterName = "@gr";
                    param.Direction = ParameterDirection.Input;
                    param.MySqlDbType = MySqlDbType.String;
                    param.Value = gr;
                    cm.Parameters.Add(param);
                    MySqlParameter param1 = new MySqlParameter();
                    param1.ParameterName = "@d";
                    param1.Direction = ParameterDirection.Input;
                    param1.MySqlDbType = MySqlDbType.DateTime;
                    param1.Value = d;
                    cm.Parameters.Add(param1);
                    MySqlDataAdapter da = new MySqlDataAdapter(cm);
                    DataTable dt = new DataTable();
                    da.Fill(dt);
                    _conn.Close();
                    return dt;

                }
                catch
                {
                    _conn.Close();
                    return null;
                }
           
            }
        }
        public List<Model.Tmpls> ListGrup()
        {
            List<Model.Tmpls> _listgrup = new List<Model.Tmpls>();
             _conn.Open();
            using (MySqlCommand cm = new MySqlCommand("gruppa", _conn))
            {
                try
                {
                    cm.CommandType=CommandType.TableDirect;
                    using (IDataReader reader=cm.ExecuteReader())
                    {
                        while(reader.Read())
                        {
                            _listgrup.Add(new Model.Tmpls{
                                value=(string)reader[0]
                            });
                            
                        }
                    }
                    _conn.Close();
                }
                catch
                {
                    _conn.Close();
                }
            }
            return _listgrup;

        }
        public List<Model.Tmpls> ListPredmet(int userid)
        {
            List<Model.Tmpls> _listpredmet = new List<Model.Tmpls>();
            _conn.Open();
            using (MySqlCommand cm = new MySqlCommand("predmett", _conn))
            {
                try
                {
                    cm.CommandType = CommandType.StoredProcedure;
                    MySqlParameter param = new MySqlParameter();
                    param.ParameterName = "@userid";
                    param.Direction = ParameterDirection.Input;
                    param.MySqlDbType = MySqlDbType.Int32;
                    param.Value = userid;
                    cm.Parameters.Add(param);
                    using (IDataReader reader = cm.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            _listpredmet.Add(new Model.Tmpls
                            {
                                value = (string)reader[0]
                            });

                        }
                    }
                    _conn.Close();
                }
                catch
                {
                    _conn.Close();
                }
            }
            return _listpredmet;

        }
        public List<Model.raspisanie> RaspisPrep(int p)
        {
            List<Model.raspisanie> listRasp = new List<Model.raspisanie>();
            _conn.Open();
            using (MySqlCommand cm = new MySqlCommand("RaspisPrep", _conn))
            {
                try
                {

                    cm.CommandType = CommandType.StoredProcedure;
                    MySqlParameter param = new MySqlParameter();
                    param.ParameterName = "@param";
                    param.Direction = ParameterDirection.Input;
                    param.MySqlDbType = MySqlDbType.Int32;
                    param.Value = p;
                    cm.Parameters.Add(param);
                    MySqlDataAdapter da = new MySqlDataAdapter(cm);
                    using (IDataReader reader = cm.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                             listRasp.Add(new Model.raspisanie(){
                             Code = reader["Code"] is DBNull  ? null : (int?)reader["Code"],
                             id_расписания=(int)reader["id_расписания"],
                             UserId = (int)reader["UserId"] ,
                             Верхняя_неделя = reader["Верхняя_неделя"] is DBNull ? null : (bool?)reader["Верхняя_неделя"],
                             Время = reader["Время"] is DBNull ? "" : (string)reader["Время"],
                             Группа1 = reader["Группа1"] is DBNull ? "" : (string)reader["Группа1"],
                             Группа2 = reader["Группа2"] is DBNull ? "" : (string)reader["Группа2"],
                             Группа3 = reader["Группа3"] is DBNull ? "" : (string)reader["Группа3"],
                             День_недели = reader["День_недели"] is DBNull ? null : (int?)reader["День_недели"],
                             Нетиповая_неделя = reader["Нетиповая_неделя"] is DBNull ? null : (bool?)reader["Нетиповая_неделя"],
                             Нижняя_неделя = reader["Нижняя_неделя"] is DBNull ? null : (bool?)reader["Нижняя_неделя"],
                             Номер_аудитории = reader["Номер_аудитории"] is DBNull ? "" : (string)reader["Номер_аудитории"],
                             Номер_пары = reader["Номер_пары"] is DBNull ? null : (int?)reader["Номер_пары"],
                             Подгруппа = reader["Подгруппа"] is DBNull ? "" : (string)reader["Подгруппа"],
                             Примечание = reader["Примечание"] is DBNull ? "" : (string)reader["Примечание"],
                             Тип_занятия = reader["Тип_занятия"] is DBNull ? "" : (string)reader["Тип_занятия"],
                             Типовая_неделя = reader["Типовая_неделя"] is DBNull ? null : (bool?)reader["Типовая_неделя"],
                             Название_предмета = reader[17] is DBNull ? "" : (string)reader[17]
                             });
                        }
                    }

                }
                catch
                {
                    _conn.Close();
                    return null;
                }
                return listRasp;

            }
        }
        public void AddSubject(int predm1, string aud1, string tip1, bool? verh1,int day,int num,int us)
        {
            _conn.Open();
            using (MySqlCommand cm = new MySqlCommand("AddRaspSubject", _conn))
            {
                try
                {
                    cm.CommandType = CommandType.StoredProcedure;
                    MySqlParameter predm = new MySqlParameter();
                    predm.ParameterName = "@predm";
                    predm.Direction = ParameterDirection.Input;
                    predm.MySqlDbType = MySqlDbType.Int32;
                    predm.Value = predm1;
                    cm.Parameters.Add(predm);
                    MySqlParameter aud = new MySqlParameter();
                    aud.ParameterName = "@aud";
                    aud.Direction = ParameterDirection.Input;
                    aud.MySqlDbType = MySqlDbType.String;
                    aud.Value = aud1;
                    cm.Parameters.Add(aud);
                    MySqlParameter tip = new MySqlParameter();
                    tip.ParameterName = "@tip";
                    tip.Direction = ParameterDirection.Input;
                    tip.MySqlDbType = MySqlDbType.String;
                    tip.Value = tip1;
                    cm.Parameters.Add(tip);
                    MySqlParameter verh = new MySqlParameter();
                    verh.ParameterName = "@verh";
                    verh.Direction = ParameterDirection.Input;
                    verh.MySqlDbType = MySqlDbType.Bit;
                    verh.Value = verh1;
                    cm.Parameters.Add(verh);
                    MySqlParameter d1 = new MySqlParameter();
                    d1.ParameterName = "@d";
                    d1.Direction = ParameterDirection.Input;
                    d1.MySqlDbType = MySqlDbType.Int32;
                    d1.Value = day;
                    cm.Parameters.Add(d1);
                    MySqlParameter para1 = new MySqlParameter();
                    para1.ParameterName = "@para";
                    para1.Direction = ParameterDirection.Input;
                    para1.MySqlDbType = MySqlDbType.Int32;
                    para1.Value = num;
                    cm.Parameters.Add(para1);
                    MySqlParameter user = new MySqlParameter();
                    user.ParameterName = "@users";
                    user.Direction = ParameterDirection.Input;
                    user.MySqlDbType = MySqlDbType.Int32;
                    user.Value = us;
                    cm.Parameters.Add(user);
                    cm.ExecuteNonQuery();
                    _conn.Close();
                }
                catch
                {
                    _conn.Close();
                }
            }
        }
        public void UpdataSubject(int predm1, string aud1, string tip1, bool? verh1,int id)
        {
            _conn.Open();
            using (MySqlCommand cm = new MySqlCommand("UpdRaspSubject", _conn))
            {
                try
                {
                    cm.CommandType = CommandType.StoredProcedure;
                    MySqlParameter predm = new MySqlParameter();
                    predm.ParameterName = "@predm";
                    predm.Direction = ParameterDirection.Input;
                    predm.MySqlDbType = MySqlDbType.Int32;
                    predm.Value = predm1;
                    cm.Parameters.Add(predm);
                    MySqlParameter aud = new MySqlParameter();
                    aud.ParameterName = "@aud";
                    aud.Direction = ParameterDirection.Input;
                    aud.MySqlDbType = MySqlDbType.String;
                    aud.Value = aud1;
                    cm.Parameters.Add(aud);
                    MySqlParameter tip = new MySqlParameter();
                    tip.ParameterName = "@tip";
                    tip.Direction = ParameterDirection.Input;
                    tip.MySqlDbType = MySqlDbType.String;
                    tip.Value = tip1;
                    cm.Parameters.Add(tip);
                    MySqlParameter verh = new MySqlParameter();
                    verh.ParameterName = "@verh";
                    verh.Direction = ParameterDirection.Input;
                    verh.MySqlDbType = MySqlDbType.Bit;
                    verh.Value = verh1;
                    cm.Parameters.Add(verh);
                    MySqlParameter d1 = new MySqlParameter();
                    d1.ParameterName = "@id";
                    d1.Direction = ParameterDirection.Input;
                    d1.MySqlDbType = MySqlDbType.Int32;
                    d1.Value = id;
                    cm.Parameters.Add(d1);
                    cm.ExecuteNonQuery();
                    _conn.Close();
                }
                catch
                {
                    _conn.Close();
                }
            }
        }
        public void AddPredmet(string predmet,int userid)
        {
            _conn.Open();
            //try
            //{
                using (MySqlCommand cmm = new MySqlCommand("AddPredmet", _conn))
                {
                    cmm.CommandType = CommandType.StoredProcedure;
                    MySqlParameter predm = new MySqlParameter();
                    predm.ParameterName = "@param";
                    predm.Direction = ParameterDirection.Input;
                    predm.MySqlDbType = MySqlDbType.String;
                    predm.Value = predmet;
                    cmm.Parameters.Add(predm);
                    MySqlParameter usid = new MySqlParameter();
                    usid.ParameterName = "@userid";
                    usid.Direction = ParameterDirection.Input;
                    usid.MySqlDbType = MySqlDbType.Int32;
                    usid.Value = userid;
                    cmm.Parameters.Add(usid);
                    cmm.ExecuteNonQuery();

                    _conn.Close();
                }
            //}
            //catch
            //{
            //    _conn.Close();
            //}
        }
        public int SelectPredmID(string name,int userid)
        {
            _conn.Open();
            using (MySqlCommand cm = new MySqlCommand("SelectPredmID", _conn))
            {
                int intle=0;
                //try
                //{

                    cm.CommandType = CommandType.StoredProcedure;
                    MySqlParameter param = new MySqlParameter();
                    param.ParameterName = "@param";
                    param.Direction = ParameterDirection.Input;
                    param.MySqlDbType = MySqlDbType.String;
                    param.Value = name;
                    cm.Parameters.Add(param);

                    MySqlDataAdapter da = new MySqlDataAdapter(cm);
                    using(IDataReader reader=cm.ExecuteReader())
                    {

                        if (reader.Read())
                        {
                            intle = (int)reader[0];
                            _conn.Close();
                        }
                        else
                        {
                            _conn.Close();
                            AddPredmet(name, userid);
                            _conn.Open();
                            using (IDataReader reader1 = cm.ExecuteReader())
                            {
                                reader1.Read();
                                intle = (int)reader1[0];
                            }
                            _conn.Close();
                        }
                    }
               // }
                //catch
                //{
                //    _conn.Close();
                //}
                return intle;
            }
        }
        public List<Model.Студенты> SelectStud(string search)
        {
            List<Model.Студенты> listRasp = new List<Model.Студенты>();
            _conn.Open();
            using (MySqlCommand cm = new MySqlCommand("StudPoGr", _conn))
            {
                try
                {

                    cm.CommandType = CommandType.StoredProcedure;
                    MySqlParameter param = new MySqlParameter();
                    param.ParameterName = "@gr";
                    param.Direction = ParameterDirection.Input;
                    param.MySqlDbType = MySqlDbType.String;
                    param.Value = search;
                    cm.Parameters.Add(param);
                    MySqlParameter param2 = new MySqlParameter();
                    param2.ParameterName = "@podgr";
                    param2.Direction = ParameterDirection.Input;
                    param2.MySqlDbType = MySqlDbType.String;
                    param2.Value = "";
                    cm.Parameters.Add(param2);
                    MySqlDataAdapter da = new MySqlDataAdapter(cm);
                    using (IDataReader reader = cm.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            listRasp.Add(new Model.Студенты()
                            {

                                Фамилия = reader["Фамилия"] is DBNull ? "" : (string)reader["Фамилия"],
                                Имя = reader["Имя"] is DBNull ? "" : (string)reader["Имя"],
                                Отчество = reader["Отчество"] is DBNull ? "" : (string)reader["Отчество"],
                                Дата_рождения = reader["Дата_рождения"] is DBNull ? null : (DateTime?)reader["Дата_рождения"]

                            });
                        }
                    }

                }
                catch
                {
                    _conn.Close();
                    return null;
                }
                return listRasp;
            }
        }
        public void AddComment(string _comment,int _id)
        {
            _conn.Open();
            using (MySqlCommand cm = new MySqlCommand("AddComment", _conn))
            {
                try
                {
                    cm.CommandType = CommandType.StoredProcedure;
                    MySqlParameter predm = new MySqlParameter();
                    predm.ParameterName = "@prim";
                    predm.Direction = ParameterDirection.Input;
                    predm.MySqlDbType = MySqlDbType.String;
                    predm.Value = _comment;
                    cm.Parameters.Add(predm);
                    MySqlParameter aud = new MySqlParameter();
                    aud.ParameterName = "@id";
                    aud.Direction = ParameterDirection.Input;
                    aud.MySqlDbType = MySqlDbType.Int32;
                    aud.Value = _id;
                    cm.Parameters.Add(aud);
                    cm.ExecuteNonQuery();
                    _conn.Close();
                }
                catch
                {
                    _conn.Close();
                }
            }
        }
        public void AddGroup(string gr1,string gr2,string gr3, int _id)
        {
            _conn.Open();
            using (MySqlCommand cm = new MySqlCommand("AddGroups", _conn))
            {
                try
                {
                    cm.CommandType = CommandType.StoredProcedure;
                    MySqlParameter _group1 = new MySqlParameter();
                    _group1.ParameterName = "@gr1";
                    _group1.Direction = ParameterDirection.Input;
                    _group1.MySqlDbType = MySqlDbType.String;
                    _group1.Value = gr1;
                    cm.Parameters.Add(_group1);
                    MySqlParameter _group2 = new MySqlParameter();
                    _group2.ParameterName = "@gr2";
                    _group2.Direction = ParameterDirection.Input;
                    _group2.MySqlDbType = MySqlDbType.String;
                    _group2.Value = gr2;
                    cm.Parameters.Add(_group2);
                    MySqlParameter _group3 = new MySqlParameter();
                    _group3.ParameterName = "@gr3";
                    _group3.Direction = ParameterDirection.Input;
                    _group3.MySqlDbType = MySqlDbType.String;
                    _group3.Value = gr3;
                    cm.Parameters.Add(_group3);
                    MySqlParameter aud = new MySqlParameter();
                    aud.ParameterName = "@id";
                    aud.Direction = ParameterDirection.Input;
                    aud.MySqlDbType = MySqlDbType.Int32;
                    aud.Value = _id;
                    cm.Parameters.Add(aud);
                    cm.ExecuteNonQuery();
                    _conn.Close();
                }
                catch
                {
                    _conn.Close();
                }
            }
        }
        public DataTable RaspisDatePrep(int p1, int p2)
        {
            _conn.Open();
            using (MySqlCommand cm = new MySqlCommand("RaspisDatePrep", _conn))
            {
                try
                {

                    cm.CommandType = CommandType.StoredProcedure;
                    MySqlParameter param = new MySqlParameter();
                    param.ParameterName = "@param";
                    param.Direction = ParameterDirection.Input;
                    param.MySqlDbType = MySqlDbType.Int32;
                    param.Value = p1;
                    cm.Parameters.Add(param);
                    MySqlParameter param1 = new MySqlParameter();
                    param1.ParameterName = "@param1";
                    param1.Direction = ParameterDirection.Input;
                    param1.MySqlDbType = MySqlDbType.Int32;
                    param1.Value = p2;
                    cm.Parameters.Add(param1);
                    MySqlDataAdapter da = new MySqlDataAdapter(cm);
                    DataTable dt = new DataTable();
                    da.Fill(dt);
                    _conn.Close();
                    return dt;

                }
                catch
                {
                    _conn.Close();
                    return null;
                }

            }
        }
        public IEnumerable<Model.raspisanie> getraspisanie()
        {
            Model.Baza bz = new Model.Baza();
            return bz.raspisanies.ToList<Model.raspisanie>();
        }
    }


    /*
     class name_context DBContext{
     
      }
     */
}
