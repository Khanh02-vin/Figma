import 'dart:async';
import 'package:flutter/material.dart';
import '../theme/app_theme.dart';
import '../models/data_constants.dart';
import '../models/models.dart';
import '../widgets/primary_button.dart';
import '../widgets/device_icon.dart';

class AddDeviceNearbyScreen extends StatefulWidget {
  final VoidCallback onBack;
  final VoidCallback onManualAdd;
  final VoidCallback onConnectAll;
  final VoidCallback onScan;

  const AddDeviceNearbyScreen({
    super.key,
    required this.onBack,
    required this.onManualAdd,
    required this.onConnectAll,
    required this.onScan,
  });

  @override
  State<AddDeviceNearbyScreen> createState() => _AddDeviceNearbyScreenState();
}

class _AddDeviceNearbyScreenState extends State<AddDeviceNearbyScreen> {
  int _activeTab = 0;
  bool _showDevices = false;
  int _pulseIndex = 0;
  Timer? _pulseTimer;

  @override
  void initState() {
    super.initState();
    Future.delayed(const Duration(milliseconds: 1500), () {
      if (mounted) setState(() => _showDevices = true);
    });
    _pulseTimer = Timer.periodic(const Duration(milliseconds: 800), (_) {
      if (mounted) setState(() => _pulseIndex = (_pulseIndex + 1) % 4);
    });
  }

  @override
  void dispose() {
    _pulseTimer?.cancel();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: SafeArea(
        child: Column(
          children: [
            // Header
            Padding(
              padding: const EdgeInsets.all(16),
              child: Row(
                children: [
                  IconButton(onPressed: widget.onBack, icon: const Icon(Icons.arrow_back, size: 28)),
                  const Expanded(
                    child: Text(
                      'Add Device',
                      textAlign: TextAlign.center,
                      style: TextStyle(fontSize: 17, fontWeight: FontWeight.w600),
                    ),
                  ),
                  IconButton(onPressed: widget.onScan, icon: const Icon(Icons.qr_code_scanner, size: 28)),
                ],
              ),
            ),
            // Tabs
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16),
              child: Container(
                padding: const EdgeInsets.all(4),
                decoration: BoxDecoration(
                  color: AppColors.muted.withValues(alpha: 0.3),
                  borderRadius: BorderRadius.circular(12),
                ),
                child: Row(
                  children: [
                    _TabButton(
                      label: 'Nearby Devices',
                      isActive: _activeTab == 0,
                      onTap: () => setState(() => _activeTab = 0),
                    ),
                    _TabButton(
                      label: 'Add Manual',
                      isActive: _activeTab == 1,
                      onTap: () {
                        setState(() => _activeTab = 1);
                        widget.onManualAdd();
                      },
                    ),
                  ],
                ),
              ),
            ),
            const SizedBox(height: 24),
            const Text(
              'Looking for nearby devices...',
              style: TextStyle(fontSize: 18, fontWeight: FontWeight.w600, color: AppColors.foreground),
            ),
            const SizedBox(height: 12),
            // Connection info
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                _ConnectionBadge(icon: Icons.wifi, label: 'Wifi'),
                const SizedBox(width: 8),
                _ConnectionBadge(icon: Icons.bluetooth, label: 'Bluetooth'),
                const SizedBox(width: 8),
                const Text(
                  'Turn on your Wifi & Bluetooth to connect',
                  style: TextStyle(fontSize: 12, color: AppColors.mutedForeground),
                ),
              ],
            ),
            const SizedBox(height: 24),
            // Radar view
            Expanded(
              child: Center(
                child: SizedBox(
                  width: 280,
                  height: 280,
                  child: Stack(
                    alignment: Alignment.center,
                    children: [
                      // Concentric circles
                      for (var i = 0; i < 4; i++)
                        AnimatedContainer(
                          duration: const Duration(milliseconds: 500),
                          width: 280.0 - i * 56,
                          height: 280.0 - i * 56,
                          decoration: BoxDecoration(
                            shape: BoxShape.circle,
                            border: Border.all(
                              color: _pulseIndex == i
                                  ? AppColors.primary.withValues(alpha: 0.4)
                                  : AppColors.primary.withValues(alpha: 0.1),
                              width: 1.5,
                            ),
                          ),
                        ),
                      // Center avatar
                      Container(
                        width: 64,
                        height: 64,
                        decoration: BoxDecoration(
                          shape: BoxShape.circle,
                          border: Border.all(color: AppColors.primary, width: 2),
                        ),
                        child: const CircleAvatar(
                          backgroundColor: Color(0xFFFCD34D),
                          child: Icon(Icons.person, color: Color(0xFF8B6914)),
                        ),
                      ),
                      // Devices
                      for (var i = 0; i < nearbyDevices.length; i++)
                        if (_showDevices)
                          Positioned(
                            left: _getX(i, 280),
                            top: _getY(i, 280),
                            child: AnimatedOpacity(
                              opacity: 1.0,
                              duration: const Duration(milliseconds: 700),
                              child: Container(
                                width: 56,
                                height: 56,
                                decoration: BoxDecoration(
                                  color: Colors.white,
                                  borderRadius: BorderRadius.circular(12),
                                  boxShadow: [
                                    BoxShadow(
                                      color: Colors.black.withValues(alpha: 0.08),
                                      blurRadius: 8,
                                      offset: const Offset(0, 2),
                                    ),
                                  ],
                                ),
                                child: DeviceIcon(type: _deviceTypeString(nearbyDevices[i].type), size: 40),
                              ),
                            ),
                          ),
                    ],
                  ),
                ),
              ),
            ),
            // Footer
            Padding(
              padding: const EdgeInsets.all(24),
              child: Column(
                children: [
                  PrimaryButton(label: 'Connect to All Devices', onTap: widget.onConnectAll),
                  const SizedBox(height: 16),
                  const Text(
                    "Can't find your devices?",
                    style: TextStyle(fontSize: 13, color: AppColors.mutedForeground),
                  ),
                  const SizedBox(height: 4),
                  const Text(
                    'Learn more',
                    style: TextStyle(
                      fontSize: 13,
                      fontWeight: FontWeight.w500,
                      color: AppColors.primary,
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  String _deviceTypeString(DeviceType type) {
    switch (type) {
      case DeviceType.lamp: return 'lamp';
      case DeviceType.cctv: return 'cctv';
      case DeviceType.speaker: return 'speaker';
      case DeviceType.router: return 'router';
      case DeviceType.ac: return 'ac';
      case DeviceType.webcam: return 'webcam';
    }
  }

  double _getX(int index, double size) {
    final positions = [
      [0.15, 0.20],
      [0.70, 0.15],
      [0.10, 0.60],
      [0.75, 0.55],
      [0.45, 0.85],
    ];
    return positions[index][0] * size;
  }

  double _getY(int index, double size) {
    final positions = [
      [0.15, 0.20],
      [0.70, 0.15],
      [0.10, 0.60],
      [0.75, 0.55],
      [0.45, 0.85],
    ];
    return positions[index][1] * size;
  }
}

class _TabButton extends StatelessWidget {
  final String label;
  final bool isActive;
  final VoidCallback onTap;

  const _TabButton({
    required this.label,
    required this.isActive,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return Expanded(
      child: GestureDetector(
        onTap: onTap,
        child: Container(
          padding: const EdgeInsets.symmetric(vertical: 12),
          decoration: BoxDecoration(
            color: isActive ? AppColors.primary : Colors.transparent,
            borderRadius: BorderRadius.circular(8),
          ),
          child: Text(
            label,
            textAlign: TextAlign.center,
            style: TextStyle(
              fontSize: 13,
              fontWeight: FontWeight.w500,
              color: isActive ? Colors.white : AppColors.mutedForeground,
            ),
          ),
        ),
      ),
    );
  }
}

class _ConnectionBadge extends StatelessWidget {
  final IconData icon;
  final String label;

  const _ConnectionBadge({required this.icon, required this.label});

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 32,
      height: 32,
      decoration: BoxDecoration(
        color: AppColors.primary.withValues(alpha: 0.1),
        shape: BoxShape.circle,
      ),
      child: Icon(icon, size: 16, color: AppColors.primary),
    );
  }
}
