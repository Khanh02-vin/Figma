import 'package:flutter/material.dart';
import '../theme/app_theme.dart';
import '../models/data_constants.dart';
import '../widgets/device_icon.dart';

class CategoryDevicesScreen extends StatefulWidget {
  final String category; // 'lightning' | 'cameras'
  final VoidCallback onBack;
  final Function(String) onNavigate;

  const CategoryDevicesScreen({
    super.key,
    required this.category,
    required this.onBack,
    required this.onNavigate,
  });

  @override
  State<CategoryDevicesScreen> createState() => _CategoryDevicesScreenState();
}

class _CategoryDevicesScreenState extends State<CategoryDevicesScreen> {
  late Map<int, bool> _states;

  @override
  void initState() {
    super.initState();
    final devices = widget.category == 'lightning' ? lightningDevices : cameraDevices;
    _states = {for (var d in devices) d['id'] as int: d['isOn'] as bool};
  }

  @override
  Widget build(BuildContext context) {
    final devices = widget.category == 'lightning' ? lightningDevices : cameraDevices;
    final isLightning = widget.category == 'lightning';
    final title = isLightning ? 'Lightning' : 'Cameras';

    return Scaffold(
      backgroundColor: const Color(0xFFF9FAFB),
      body: SafeArea(
        child: Column(
          children: [
            // Header
            Container(
              padding: const EdgeInsets.all(16),
              color: Colors.white,
              child: Row(
                children: [
                  IconButton(
                    onPressed: widget.onBack,
                    icon: const Icon(Icons.arrow_back, size: 24),
                  ),
                  Expanded(
                    child: Text(
                      '$title (${devices.length})',
                      textAlign: TextAlign.center,
                      style: const TextStyle(
                        fontSize: 17,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                  ),
                  IconButton(
                    onPressed: () {},
                    icon: const Icon(Icons.more_vert, color: AppColors.mutedForeground),
                  ),
                ],
              ),
            ),
            // Grid
            Expanded(
              child: GridView.builder(
                padding: const EdgeInsets.all(16),
                gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                  crossAxisCount: 2,
                  mainAxisSpacing: 12,
                  crossAxisSpacing: 12,
                  childAspectRatio: 0.95,
                ),
                itemCount: devices.length,
                itemBuilder: (ctx, i) {
                  final dev = devices[i];
                  final isOn = _states[dev['id']]!;
                  final hasLive = dev['hasLive'] as bool? ?? false;
                  final room = dev['room'] as String;
                  final name = dev['name'] as String;

                  return _CatDeviceCard(
                    device: dev,
                    name: name,
                    room: room,
                    isOn: isOn,
                    hasLive: hasLive,
                    isLightning: isLightning,
                    onTap: () => widget.onNavigate(isLightning ? 'control-lamp' : 'control-cctv'),
                    onToggle: () => setState(() => _states[dev['id'] as int] = !_states[dev['id'] as int]!),
                  );
                },
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _CatDeviceCard extends StatelessWidget {
  final Map<String, dynamic> device;
  final String name;
  final String room;
  final bool isOn;
  final bool hasLive;
  final bool isLightning;
  final VoidCallback onTap;
  final VoidCallback onToggle;

  const _CatDeviceCard({
    required this.device,
    required this.name,
    required this.room,
    required this.isOn,
    required this.hasLive,
    required this.isLightning,
    required this.onTap,
    required this.onToggle,
  });

  @override
  Widget build(BuildContext context) {
    // Camera with live view
    if (!isLightning && hasLive && isOn) {
      return GestureDetector(
        onTap: onTap,
        child: Container(
          decoration: BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.circular(12),
          ),
          child: Stack(
            children: [
              Positioned.fill(
                child: Container(
                  decoration: const BoxDecoration(
                    borderRadius: BorderRadius.vertical(top: Radius.circular(12)),
                    gradient: LinearGradient(
                      begin: Alignment.topLeft,
                      end: Alignment.bottomRight,
                      colors: [Color(0xFFFDE68A), Color(0xFFFEF3C7)],
                    ),
                  ),
                ),
              ),
              Positioned(
                top: 8,
                left: 8,
                child: Container(
                  padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                  decoration: BoxDecoration(
                    color: Colors.black54,
                    borderRadius: BorderRadius.circular(6),
                  ),
                  child: Row(
                    mainAxisSize: MainAxisSize.min,
                    children: const [
                      _Dot(),
                      SizedBox(width: 4),
                      Text('Live', style: TextStyle(fontSize: 10, color: Colors.white)),
                    ],
                  ),
                ),
              ),
              Positioned(
                top: 8,
                right: 8,
                child: GestureDetector(onTap: onToggle, child: _ToggleSw(isOn: isOn)),
              ),
              Positioned(
                bottom: 8,
                left: 8,
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(name, style: const TextStyle(fontSize: 12, fontWeight: FontWeight.w600)),
                    Text(room, style: TextStyle(fontSize: 11, color: AppColors.mutedForeground)),
                  ],
                ),
              ),
            ],
          ),
        ),
      );
    }

    // Standard card
    return GestureDetector(
      onTap: onTap,
      child: Container(
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(12),
        ),
        padding: const EdgeInsets.all(12),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                DeviceIcon(
                  type: isLightning
                      ? (device['type'] as String)
                      : (name.contains('Webcam') ? 'webcam' : 'cctv'),
                  size: 56,
                ),
                GestureDetector(onTap: onToggle, child: _ToggleSw(isOn: isOn)),
              ],
            ),
            const Spacer(),
            Text(name, style: const TextStyle(fontSize: 13, fontWeight: FontWeight.w500)),
            const SizedBox(height: 2),
            Row(
              children: [
                Icon(Icons.wifi, size: 12, color: AppColors.mutedForeground),
                const SizedBox(width: 4),
                Text(room, style: TextStyle(fontSize: 12, color: AppColors.mutedForeground)),
              ],
            ),
          ],
        ),
      ),
    );
  }
}

class _Dot extends StatelessWidget {
  const _Dot();
  @override
  Widget build(BuildContext context) {
    return Container(
      width: 6,
      height: 6,
      decoration: const BoxDecoration(
        color: Colors.red,
        shape: BoxShape.circle,
      ),
    );
  }
}

class _ToggleSw extends StatelessWidget {
  final bool isOn;
  const _ToggleSw({required this.isOn});
  @override
  Widget build(BuildContext context) {
    return Container(
      width: 44,
      height: 24,
      padding: const EdgeInsets.all(2),
      decoration: BoxDecoration(
        color: isOn ? AppColors.primary : AppColors.muted,
        borderRadius: BorderRadius.circular(12),
      ),
      child: AnimatedAlign(
        alignment: isOn ? Alignment.centerRight : Alignment.centerLeft,
        duration: const Duration(milliseconds: 200),
        child: Container(
          width: 20,
          height: 20,
          decoration: const BoxDecoration(
            color: Colors.white,
            shape: BoxShape.circle,
          ),
        ),
      ),
    );
  }
}
