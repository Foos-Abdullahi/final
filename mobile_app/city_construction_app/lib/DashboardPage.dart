// ignore_for_file: prefer_const_literals_to_create_immutables, prefer_const_constructors, prefer_const_constructors_in_immutables, non_constant_identifier_names, file_names
import 'dart:convert';
import 'package:city_construction_app/ProjectListPage.dart';
import 'package:city_construction_app/profilePage.dart';
import 'package:http/http.dart' as http;
import 'package:animate_do/animate_do.dart';
import 'package:flutter/material.dart';

class DashboardPage extends StatefulWidget {
  final int clientId;
  DashboardPage({
    Key? key,
    required this.clientId,
  }) : super(key: key);

  @override
  State<DashboardPage> createState() => _DashboardPageState();
}

class _DashboardPageState extends State<DashboardPage> {
  List clientsList = [];
  List projectsList = [];
  @override
  void initState() {
    super.initState();
    LoadClients();
    fetchProjects();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      // appBar: AppBar(
      //   backgroundColor: Colors.transparent,
      //   elevation: 0,
      //   leading: BackButton(
      //     color: Colors.blue[900],
      //   ),
      // ),
      body: SafeArea(
        child: Container(
          width: double.infinity,
          decoration: BoxDecoration(
              gradient: LinearGradient(begin: Alignment.topCenter, colors: [
            const Color.fromARGB(255, 13, 71, 161),
            Color(0xFF6FD7BC),
          ])),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: <Widget>[
              Padding(
                padding: EdgeInsets.all(20),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: <Widget>[
                    FadeInUp(
                        duration: Duration(milliseconds: 1000),
                        child: Image.asset(
                      'images/white-logo.png',
                      height: 100,
                    ),),
                    FadeInUp(
                        duration: Duration(milliseconds: 1300),
                        child: Text(
                          "Welcome To Our Dashboard",
                          style: TextStyle(color: Colors.white,fontWeight: FontWeight.bold, fontSize: 24),
                        )),
                  ],
                ),
              ),
              SizedBox(height: 16),
              Expanded(
                child: Container(
                  decoration: BoxDecoration(
                      color: Colors.white,
                      borderRadius: BorderRadius.only(
                          topLeft: Radius.circular(60),
                          topRight: Radius.circular(60))),
                  child: Padding(
                    padding: EdgeInsets.all(30),
                    child: Column(
                      children: <Widget>[
                        SizedBox(
                          height: 16,
                        ),
                        CircleAvatar(
                          backgroundImage: NetworkImage(
                              'https://raw.githubusercontent.com/Foos-Abdullahi/final/main/Frontend/react-admin-dashboard-master/react-admin-dashboard-master/public/assets/client/${clientsList[0]['client_image']}'),
                          radius: 60,
                        ),
                        SizedBox(
                          height: 30,
                        ),
                        for (var clients in clientsList)
                          Row(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: [
                              Column(
                                crossAxisAlignment: CrossAxisAlignment.center,
                                children: [
                                  Text(
                                    clients['client_name'],
                                    style: TextStyle(
                                        fontSize: 26,
                                        fontWeight: FontWeight.bold,
                                        color: Colors.blue[900]),
                                  ),
                                  Text(
                                    'Phone: ${clients['phone']}',
                                    style: TextStyle(
                                      fontSize: 16,
                                      color: Colors.blue[900],
                                    ),
                                  ),
                                ],
                              ),
                            ],
                          ),
                        SizedBox(
                          height: 40,
                        ),
                        FadeInUp(
                            duration: Duration(milliseconds: 1400),
                            child: Container(
                              decoration: BoxDecoration(
                                  color: Colors.white,
                                  borderRadius: BorderRadius.circular(10),
                                  boxShadow: [
                                    BoxShadow(
                                        color: Color.fromRGBO(17, 17, 17, 0.29),
                                        blurRadius: 20,
                                        offset: Offset(0, 10))
                                  ]),
                              child: Column(
                                children: <Widget>[
                                  Container(
                                    decoration: BoxDecoration(
                                      gradient: LinearGradient(
                                        colors: [
                                          Color(0xFF6FD7BC),
                                          const Color.fromARGB(255, 13, 71, 161)
                                        ],
                                        begin: Alignment.centerLeft,
                                        end: Alignment.centerRight,
                                      ),
                                      borderRadius: BorderRadius.circular(10),
                                    ),
                                    padding: EdgeInsets.all(16),
                                    child: Row(
                                      children: [
                                        Icon(
                                          Icons.person,
                                          color: Colors.white,
                                        ),
                                        SizedBox(width: 8),
                                        TextButton(
                                          onPressed: () {
                                            Navigator.push(
                                              context,
                                              MaterialPageRoute(
                                                  builder: (context) =>
                                                      ProfilePage(
                                                        clientId: widget.clientId,
                                                      )),
                                            );
                                          },
                                          child: Text(
                                            'Personal Profile',
                                            style: TextStyle(
                                              fontSize: 24,
                                              fontWeight: FontWeight.bold,
                                              color: Colors.white,
                                            ),
                                          ),
                                        ),
                                      ],
                                    ),
                                  ),
                                  SizedBox(height: 16),
                                  Container(
                                    decoration: BoxDecoration(
                                      gradient: LinearGradient(
                                        colors: [
                                          Color(0xFF6FD7BC),
                                          const Color.fromARGB(255, 13, 71, 161)
                                        ],
                                        begin: Alignment.centerLeft,
                                        end: Alignment.centerRight,
                                      ),
                                      borderRadius: BorderRadius.circular(10),
                                    ),
                                    padding: EdgeInsets.all(16),
                                    child: Row(
                                      children: [
                                        Icon(
                                          Icons.list,
                                          color: Colors.white,
                                        ),
                                        SizedBox(width: 8),
                                        TextButton(
                                          onPressed: () {
                                            Navigator.push(
                                              context,
                                              MaterialPageRoute(
                                                  builder: (context) =>
                                                      ProjectListPage(
                                                          clientId:
                                                              widget.clientId)),
                                            );
                                          },
                                          child: Text(
                                            'View Projects',
                                            style: TextStyle(
                                              fontSize: 24,
                                              fontWeight: FontWeight.bold,
                                              color: Colors.white,
                                            ),
                                          ),
                                        ),
                                      ],
                                    ),
                                  ),
                                ],
                              ),
                            )),
                        SizedBox(height: 16),
                      ],
                    ),
                  ),
                ),
              )
            ],
          ),
        ),
      ),
    );
  }

  Future<void> LoadClients() async {
    clientsList.clear();
    var url = 'http://10.0.2.2:8000/Client/';
    var res = await http.get(
      Uri.parse(url),
    );

    List clients = jsonDecode(res.body);

    var loggedInClient = clients.firstWhere(
      (client) => client['id'] == widget.clientId,
      orElse: () => null,
    );

    if (loggedInClient != null) {
      setState(() {
        clientsList.add(loggedInClient);
      });
    }
  }

  Future<void> fetchProjects() async {
    projectsList.clear();
    var url = 'http://10.0.2.2:8000/Projects/';
    var res = await http.get(
      Uri.parse(url),
    );

    List projects = jsonDecode(res.body);

    setState(() {
      projectsList = projects;
    });
  }
}
