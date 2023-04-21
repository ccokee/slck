from django.test import TestCase
from unittest.mock import patch
from slck import settings

class TestSlckTerminalBackend(TestCase):

    @patch.dict('os.environ', {'SLCK_REDIS_SERVICE': 'mocked_redis_host', 'SLCK_REDIS_PORT': '1234'})
    def test_mocked_env(self):
        with self.settings():
            from importlib import reload
            reload(settings)
            self.assertEqual(settings.CHANNEL_LAYERS['default']['CONFIG']['hosts'][0][0], 'mocked_redis_host')
            self.assertEqual(settings.CHANNEL_LAYERS['default']['CONFIG']['hosts'][0][1], 1234)

