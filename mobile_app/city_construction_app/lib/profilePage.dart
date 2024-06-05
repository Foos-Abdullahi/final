// ignore_for_file: prefer_const_constructors, prefer_const_literals_to_create_immutables, sort_child_properties_last, avoid_print, deprecated_member_use, use_key_in_widget_constructors, prefer_const_constructors_in_immutables
import 'dart:convert';

import 'package:city_construction_app/DashboardPage.dart';
import 'package:city_construction_app/ForgotPassword.dart';
import 'package:city_construction_app/SignInPage.dart';

import 'package:http/http.dart' as http;
import 'package:flutter/material.dart';

class ProfilePage extends StatefulWidget {
  final int clientId ;
  // final int projecId;
ProfilePage({Key? key, required this.clientId}) : super(key: key);

  @override
  State<ProfilePage> createState() => _ProfilePageState();
}

class _ProfilePageState extends State<ProfilePage> {
  Map<String, dynamic> clientsList = {};
  // List<dynamic> projectsList = [];
  @override
  void initState() {
    super.initState();
    LoadClients();
  }
  Future<void> LoadClients() async {
    var url = 'http://10.0.2.2:8000/Client/view/${widget.clientId}';
    var res = await http.get(
      Uri.parse(url),
    );
    var client = jsonDecode(res.body);
    setState(() {
      clientsList = client;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        elevation: 0,
        centerTitle: true,
        title: Text(
          'My Profile',
          style: TextStyle(
              color: Colors.white,
              fontFamily: 'inter',
              fontWeight: FontWeight.w400,
              fontSize: 16),
        ),
        leading: IconButton(
          icon: Icon(
            Icons.arrow_back_ios,
            color: Color(0xFF6FD7BC),
          ),
          onPressed: () {
            Navigator.of(context).pop();
          },
        ),
      ),
      body: ListView(
        shrinkWrap: true,
        physics: BouncingScrollPhysics(),
        children: [
          // Section 1 - Profile Picture Wrapper
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
            ),
            padding: EdgeInsets.symmetric(vertical: 24),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.start,
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                Container(
                  width: 130,
                  height: 130,
                  margin: EdgeInsets.only(bottom: 15),
                  decoration: BoxDecoration(
                    color: Colors.grey,
                    borderRadius: BorderRadius.circular(100),
                    border: Border.all(
                      color: Colors.white,
                      width: 2,
                    ),
                    // Profile Picture
                    image: clientsList['client_image'] != null
            ?DecorationImage(
                        image: NetworkImage('https://raw.githubusercontent.com/Foos-Abdullahi/final/main/Frontend/react-admin-dashboard-master/react-admin-dashboard-master/public/assets/client/${clientsList['client_image']}'),
                        fit: BoxFit.cover)
                        :null,
                  ),
                ),
                // for (var clients in clientsList)
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Text(
                      clientsList['client_name'] ?? '',
                      style: TextStyle(
                          fontFamily: 'inter',
                          fontWeight: FontWeight.w600,
                          color: Colors.white),
                    ),
                    
                  ],
                ),
                SizedBox(width: 8),
                // for (var clients in clientsList)
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Text(
                      'Phone: ${clientsList['phone'] ?? ''} ' ,
                      style: TextStyle(
                          fontFamily: 'inter',
                          fontWeight: FontWeight.w600,
                          color: Colors.white),
                    ),
                  ],
                )
              ],
            ),
          ),
          // Section 2 - User Info Wrapper
          Container(
            margin: EdgeInsets.only(top: 24),
            width: MediaQuery.of(context).size.width,
            child: Column(
              mainAxisAlignment: MainAxisAlignment.start,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Container(
                  margin: EdgeInsets.zero,
                  padding: EdgeInsets.symmetric(vertical: 12, horizontal: 16),
                  decoration: BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.circular(8),
                    boxShadow: [
                      BoxShadow(
                        color: Colors.black.withOpacity(0.1),
                        blurRadius: 4,
                        offset: Offset(0, 2),
                      ),
                    ],
                  ),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.start,
                    children: [
                      Icon(
                        Icons.lock,
                        color: const Color.fromARGB(255, 13, 71, 161),
                      ),
                      TextButton(
                        onPressed: () {
                         Navigator.push(
                              context,
                              MaterialPageRoute(
                                  builder: (context) => ForgotPassword(clientId: widget.clientId,)),
                            );
                        },
                        child: Text(
                          'Change Password',
                          style: TextStyle(
                            color: const Color.fromARGB(255, 13, 71, 161),
                            fontFamily: 'inter',
                            fontSize: 16,
                            fontWeight: FontWeight.w500,
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
                SizedBox(
                  height: 16,
                ),
                Container(
                  margin: EdgeInsets.zero,
                  padding: EdgeInsets.symmetric(vertical: 12, horizontal: 16),
                  decoration: BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.circular(8),
                    boxShadow: [
                      BoxShadow(
                        color: Colors.black.withOpacity(0.1),
                        blurRadius: 4,
                        offset: Offset(0, 2),
                      ),
                    ],
                  ),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.start,
                    children: [
                      Icon(
                        Icons.home,
                        color: const Color.fromARGB(255, 13, 71, 161),
                      ),
                      TextButton(
                        onPressed: () {
                          Navigator.push(
                              context,
                              MaterialPageRoute(
                                  builder: (context) => DashboardPage(clientId: widget.clientId)),
                            );
                        },
                        child: Text(
                          'Home',
                          style: TextStyle(
                            color: const Color.fromARGB(255, 13, 71, 161),
                            fontFamily: 'inter',
                            fontSize: 16,
                            fontWeight: FontWeight.w500,
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
                SizedBox(
                  height: 16,
                ),
                Container(
                  margin: EdgeInsets.zero,
                  padding: EdgeInsets.symmetric(vertical: 12, horizontal: 16),
                  decoration: BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.circular(8),
                    boxShadow: [
                      BoxShadow(
                        color: Colors.black.withOpacity(0.1),
                        blurRadius: 4,
                        offset: Offset(0, 2),
                      ),
                    ],
                  ),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.start,
                    children: [
                      Icon(
                        Icons.logout,
                        color: const Color.fromARGB(255, 13, 71, 161),
                      ),
                      TextButton(
                        onPressed: () {
                          Navigator.push(
                              context,
                              MaterialPageRoute(
                                  builder: (context) => SignInPage())
                            );
                        },
                        child: Text(
                          'Log Out',
                          style: TextStyle(
                            color: const Color.fromARGB(255, 13, 71, 161),
                            fontFamily: 'inter',
                            fontSize: 16,
                            fontWeight: FontWeight.w500,
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

   
}
