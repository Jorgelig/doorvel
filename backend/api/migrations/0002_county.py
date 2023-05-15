from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_state'),
    ]

    operations = [
        migrations.CreateModel(
            name='County',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('code', models.CharField(max_length=10)),
                ('name', models.CharField(max_length=250)),
                ('state', models.ForeignKey(on_delete=models.CASCADE, to='State')),
            ],
        ),
    ]
