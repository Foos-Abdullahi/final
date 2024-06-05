// ignore_for_file: prefer_const_constructors, avoid_print, non_constant_identifier_names, library_private_types_in_public_api, prefer_const_constructors_in_immutables, sized_box_for_whitespace

import 'dart:convert';
import 'package:city_construction_app/ProjectTaks.dart';
import 'package:city_construction_app/ProjectViewPage.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

class ProjectListPage extends StatefulWidget {
  final int clientId;

  const ProjectListPage({Key? key, required this.clientId}) : super(key: key);

  @override
  _ProjectListPageState createState() => _ProjectListPageState();
}

class _ProjectListPageState extends State<ProjectListPage> {
  List<dynamic> _projectNames = [];
  Map<String, dynamic> _clientDetails = {};
  Map<int, dynamic> _designDetailsCache = {};
  bool _isLoading = true;

  @override
  void initState() {
    super.initState();
    fetchClientDetails();
  }

  Future<void> fetchClientDetails() async {
    var url = 'http://10.0.2.2:8000/Client/view/${widget.clientId}';
    final response = await http.get(Uri.parse(url));
    if (response.statusCode == 200) {
      setState(() {
        _clientDetails = json.decode(response.body);
      });
      fetchProjectNames();
    } else {
      print('Failed to fetch client details');
    }
  }

  Future<void> fetchProjectNames() async {
    var url =
        'http://10.0.2.2:8000/Projects/searchByClientID/?client_id=${widget.clientId}';
    final response = await http.get(Uri.parse(url));
    if (response.statusCode == 200) {
      setState(() {
        _projectNames = json.decode(response.body);
      });
      for (var project in _projectNames) {
        fetchDesignImage(project['design']);
      }
    } else {
      print('Failed to fetch project names');
    }
    setState(() {
      _isLoading = false;
    });
  }

  Future<void> fetchDesignImage(int designId) async {
    if (_designDetailsCache.containsKey(designId)) {
      return;
    }

    var designUrl = 'http://10.0.2.2:8000/Design/view/$designId';
    final designResponse = await http.get(Uri.parse(designUrl));
    if (designResponse.statusCode == 200) {
      var design = json.decode(designResponse.body);
      setState(() {
        _designDetailsCache[designId] = design;
      });
    } else {
      print('Failed to fetch design image');
    }
  }

  @override
  Widget build(BuildContext context) {
    final clientName =
        _clientDetails.isNotEmpty ? _clientDetails['client_name'] : '';

    return Scaffold(
      appBar: AppBar(
        title: Text(
          'Project Lists for: $clientName',
          style: TextStyle(color: Colors.blue[900]),
        ),
        centerTitle: true,
        backgroundColor: Color(0xFF6FD7BC).withOpacity(0.1),
        leading: BackButton(color: Colors.blue[900]),
      ),
      body: _isLoading
          ? Center(
              child: CircularProgressIndicator(),
            )
          : _projectNames.isEmpty
              ? Center(child: Text('No projects found.'))
              : ListView.builder(
                  itemCount: _projectNames.length,
                  itemBuilder: (context, index) {
                    final project = _projectNames[index];
                    final designId = project['design'];
                    final designImage =
                        _designDetailsCache.containsKey(designId)
                            ? _designDetailsCache[designId]['architecture']
                            : '';
                    final prId = project['id'];
                    return Card(
                      elevation: 5,
                      margin: EdgeInsets.all(10),
                      child: Column(
                        children: [
                          Container(
                            width: double.infinity,
                            height: 200,
                            decoration: BoxDecoration(
                              image: designImage.isNotEmpty
                                  ? DecorationImage(
                                      image: NetworkImage(
                                          "https://raw.githubusercontent.com/Foos-Abdullahi/final/main/Frontend/react-admin-dashboard-master/react-admin-dashboard-master/public/assets/design/$designImage"),
                                      fit: BoxFit.cover,
                                    )
                                  : null,
                            ),
                          ),
                          SizedBox(height: 8),
                          ListTile(
                            title: Center(
                              child: Column(
                                children: [
                                  Text(
                                    project['project_name'] ??
                                        'Unnamed Project',
                                    style: TextStyle(
                                      fontSize: 18,
                                      color: Color(0xFF6FD7BC),
                                      fontWeight: FontWeight.bold,
                                    ),
                                  ),
                                  SizedBox(height: 8),
                                  Row(
                                    mainAxisAlignment:
                                        MainAxisAlignment.spaceBetween,
                                    children: [
                                      Row(
                                        children: [
                                          IconButton(
                                            onPressed: () {
                                              Navigator.push(
                                                context,
                                                MaterialPageRoute(
                                                  builder: (context) =>
                                                      ProjectViews(
                                                    projectId: project['id'],
                                                  ),
                                                ),
                                              );
                                            },
                                            icon: Icon(
                                              Icons.remove_red_eye,
                                              color: Colors.blue[900],
                                            ),
                                          ),
                                          Text(
                                            'View Project',
                                            style: TextStyle(
                                              fontSize: 16,
                                              color: Colors.blue[900],
                                              fontWeight: FontWeight.bold,
                                            ),
                                          ),
                                        ],
                                      ),
                                      SizedBox(width: 8),
                                      Row(
                                        children: [
                                          IconButton(
                                            onPressed: () {
                                              Navigator.push(
                                                context,
                                                MaterialPageRoute(
                                                  builder: (context) =>
                                                      FinishedTasks(
                                                    projectId: prId,
                                                  ),
                                                ),
                                              );
                                            },
                                            icon: Icon(
                                              Icons.remove_red_eye,
                                              color: Colors.blue[900],
                                            ),
                                          ),
                                          Text(
                                            'View Tasks',
                                            style: TextStyle(
                                              fontSize: 16,
                                              color: Colors.blue[900],
                                              fontWeight: FontWeight.bold,
                                            ),
                                          ),
                                        ],
                                      ),
                                    ],
                                  ),
                                ],
                              ),
                            ),
                          ),
                        ],
                      ),
                    );
                  },
                ),
    );
  }
}