from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_county'),
    ]

    operations = [
        migrations.CreateModel(
            name='Settlement',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('code', models.CharField(max_length=10)),
                ('name', models.CharField(max_length=250)),
                ('postal_code', models.CharField(max_length=10)),
                ('zone_type', models.CharField(max_length=20)),
                ('settlement_type', models.CharField(max_length=30)),
                ('state', models.ForeignKey(on_delete=models.CASCADE, to='State')),
                ('county', models.ForeignKey(on_delete=models.CASCADE, to='County')),

            ],
        ),
    ]
