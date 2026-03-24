import 'package:flutter/material.dart';
import '../theme/app_theme.dart';
import '../models/data_constants.dart';
import '../models/models.dart';
import '../widgets/progress_bar.dart';
import '../widgets/form_input.dart';
import '../widgets/primary_button.dart';

class SelectCountryScreen extends StatefulWidget {
  final VoidCallback onBack;
  final Function(Country) onContinue;
  final VoidCallback onSkip;

  const SelectCountryScreen({
    super.key,
    required this.onBack,
    required this.onContinue,
    required this.onSkip,
  });

  @override
  State<SelectCountryScreen> createState() => _SelectCountryScreenState();
}

class _SelectCountryScreenState extends State<SelectCountryScreen> {
  String _searchQuery = '';
  Country? _selectedCountry;

  List<Country> get _filteredCountries {
    return countries.where((c) =>
      c.name.toLowerCase().contains(_searchQuery.toLowerCase())
    ).toList();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      body: SafeArea(
        child: Column(
          children: [
            // Header
            Padding(
              padding: const EdgeInsets.all(16),
              child: Row(
                children: [
                  IconButton(
                    onPressed: widget.onBack,
                    icon: const Icon(Icons.arrow_back, size: 28),
                  ),
                  Expanded(
                    child: ProgressBar(currentStep: 1, totalSteps: 4),
                  ),
                  const SizedBox(width: 16),
                  const Text(
                    '1 / 4',
                    style: TextStyle(
                      fontSize: 13,
                      fontWeight: FontWeight.w500,
                      color: AppColors.mutedForeground,
                    ),
                  ),
                ],
              ),
            ),
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 24),
              child: Column(
                children: [
                  const Text(
                    'Select Country of Origin',
                    style: TextStyle(
                      fontSize: 22,
                      fontWeight: FontWeight.bold,
                      color: AppColors.foreground,
                    ),
                    textAlign: TextAlign.center,
                  ),
                  const SizedBox(height: 8),
                  const Text(
                    "Let's start by selecting the country where your smart haven resides.",
                    style: TextStyle(fontSize: 14, color: AppColors.mutedForeground),
                    textAlign: TextAlign.center,
                  ),
                  const SizedBox(height: 20),
                  FormInput(
                    hint: 'Search Country...',
                    value: _searchQuery,
                    onChanged: (v) => setState(() => _searchQuery = v),
                    icon: Icons.search,
                    showClear: true,
                    onClear: () => setState(() => _searchQuery = ''),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 16),
            // Country list
            Expanded(
              child: ListView.builder(
                padding: const EdgeInsets.symmetric(horizontal: 24),
                itemCount: _filteredCountries.length,
                itemBuilder: (context, index) {
                  final country = _filteredCountries[index];
                  final isSelected = _selectedCountry?.code == country.code;
                  return GestureDetector(
                    onTap: () => setState(() => _selectedCountry = country),
                    child: Container(
                      margin: const EdgeInsets.only(bottom: 12),
                      padding: const EdgeInsets.all(16),
                      decoration: BoxDecoration(
                        color: isSelected
                            ? AppColors.primary.withValues(alpha: 0.05)
                            : AppColors.input,
                        borderRadius: BorderRadius.circular(16),
                        border: isSelected
                            ? Border.all(color: AppColors.primary, width: 2)
                            : null,
                      ),
                      child: Row(
                        children: [
                          Text(
                            country.flag,
                            style: const TextStyle(fontSize: 28),
                          ),
                          const SizedBox(width: 16),
                          Expanded(
                            child: Text(
                              country.name,
                              style: TextStyle(
                                fontSize: 15,
                                fontWeight: FontWeight.w500,
                                color: isSelected
                                    ? AppColors.primary
                                    : AppColors.foreground,
                              ),
                            ),
                          ),
                          if (isSelected)
                            const Icon(Icons.check, color: AppColors.primary, size: 22),
                        ],
                      ),
                    ),
                  );
                },
              ),
            ),
            // Footer
            Padding(
              padding: const EdgeInsets.all(24),
              child: Row(
                children: [
                  Expanded(
                    child: PrimaryButton(
                      label: 'Skip',
                      isSecondary: true,
                      onTap: widget.onSkip,
                    ),
                  ),
                  const SizedBox(width: 16),
                  Expanded(
                    child: PrimaryButton(
                      label: 'Continue',
                      disabled: _selectedCountry == null,
                      onTap: () {
                        if (_selectedCountry != null) {
                          widget.onContinue(_selectedCountry!);
                        }
                      },
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
}
