module.exports = ({ $plugin }) => {
  const general_sec_id = 'general_sec_id';
  const payment_sec_id = 'payment_sec_id';

  // All sections
  $plugin.add_section({
    id: general_sec_id,
    classes: 'class-one class-two',
    title: __('General Configurations')
  });

  $plugin.add_section({
    id: payment_sec_id,
    classes: 'class-one class-two',
    title: __('Payment Detail')
  });

  $plugin.add_field({
    id: `${general_sec_id}-opts-1`,
    section_id: general_sec_id,
    classes: 'class-one class-two',
    title: __('Some opt 1'),
    input_type: 'text'
  });

  $plugin.add_field({
    id: `${payment_sec_id}-opts-2`,
    section_id: payment_sec_id,
    classes: 'class-one class-two',
    title: __('Card Name'),
    input_type: 'select',
    input_options: [
      {value: 1, label: 'Opt 1'}
    ]
  });
}
