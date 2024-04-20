from django.db import migrations, models
class Migration(migrations.Migration):

    dependencies = [
        ('Projects', '0007_alter_projects_end_date_alter_projects_start_date'),
    ]

    operations = [
        migrations.AlterField(
            model_name='projects',
            name='end_date',
            field=models.DateField(),
        ),
        migrations.AlterField(
            model_name='projects',
            name='start_date',
            field=models.DateField(),
        ),
    ]
