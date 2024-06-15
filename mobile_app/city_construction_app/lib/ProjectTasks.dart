// ignore_for_file: file_names, avoid_print, prefer_const_constructors, prefer_const_literals_to_create_immutables

import 'package:flutter/material.dart';
import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:intl/intl.dart';

class FinishedTasks extends StatefulWidget {
  final int projectId;
  const FinishedTasks({Key? key, required this.projectId}) : super(key: key);

  @override
  State<FinishedTasks> createState() => _FinishedTasksState();
}

class _FinishedTasksState extends State<FinishedTasks> {
  List<dynamic> tasks = [];
  bool isLoading = true;

  @override
  void initState() {
    super.initState();
    fetchFinishedTasks();
  }

  Future<void> fetchFinishedTasks() async {
    print("Fetching finished tasks...");
    var url = 'http://10.0.2.2:8000/Tasks/finished_tasks/${widget.projectId}';

    final response = await http.get(Uri.parse(url));
    print(response.statusCode);
    if (response.statusCode == 200) {
      final responseData = json.decode(response.body);
      setState(() {
        print(response.body);
        tasks = responseData;
        isLoading = false;
      });
      print("Tasks: $tasks");
    } else {
      setState(() {
        isLoading = false;
      });
      print('Failed to fetch tasks');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(
          'Finished Tasks',
          style: TextStyle(
            color: Colors.blue[900],
          ),
        ),
        leading: BackButton(
          color: Colors.blue[900],
        ),
      ),
      body: isLoading
          ? Center(child: CircularProgressIndicator())
          : ListView.builder(
              itemCount: tasks.length,
              itemBuilder: (context, index) {
                final task = tasks[index];
                final startDate = task['start_date'] != null
                    ? DateFormat('MMMM d, yyyy')
                        .format(DateTime.parse(task['start_date']))
                    : 'N/A';
                final endDate = task['end_date'] != null
                    ? DateFormat('MMMM d, yyyy')
                        .format(DateTime.parse(task['end_date']))
                    : 'N/A';

                return Card(
                  elevation: 5,
                  margin: EdgeInsets.all(16),
                  child: Padding(
                    padding: EdgeInsets.all(16),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        task['task_image'] != null
                            ? ClipRRect(
                                borderRadius: BorderRadius.circular(8),
                                child: Image.network(
                                  'https://raw.githubusercontent.com/Foos-Abdullahi/final/main/Frontend/react-admin-dashboard-master/react-admin-dashboard-master/public/assets/task/${task['task_image']}',
                                  width: double.infinity,
                                  height: 200,
                                  fit: BoxFit.cover,
                                ),
                              )
                            : Container(),
                        SizedBox(height: 16),
                        Text(
                          'Task Name: ${task['task_name']}',
                          style: TextStyle(fontWeight: FontWeight.bold),
                        ),
                        SizedBox(height: 8),
                        Text('Start Date: $startDate'),
                        SizedBox(height: 8),
                        Text('End Date: $endDate'),
                        SizedBox(height: 8),
                        Text('Status: ${task['status']}'),
                      ],
                    ),
                  ),
                );
              },
            ),
    );
  }
}
